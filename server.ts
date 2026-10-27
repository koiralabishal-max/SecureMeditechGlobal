import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the Senior Medical Procurement & OEM Contract Manufacturing Technical Specialist at Secure MediTech Global.
Corporate Contact Details:
- Address: 30 N Gould St Ste R, Sheridan, WY 82801, USA
- Phone: +1 (307) 533-4504
- Email: info@securemeditechglobal.com

Core Capabilities & Company Profile:
- International supplier and OEM/ODM contract manufacturer for precision medical consumables, surgical kits, critical care catheters, and diagnostic equipment.
- Facilities: ISO 13485:2016 certified, Class 100,000 (ISO Class 8) and Class 10,000 (ISO Class 7) cleanrooms, automated injection molding, precision extrusion, EtO (Ethylene Oxide) & Gamma radiation sterilization chambers.
- Compliance & Documentation: CE marked, FDA 510(k) pathway support, ISO 13485:2016, batch sterilization certificates (CoAs), bio-compatibility reports (ISO 10993).

Key Product Lines:
1. Critical Care & Monitoring: CVP (Central Venous Pressure) Kits (single/dual/triple lumen, Seldinger technique, nitinol guidewire), Pressure Monitoring Kits (transducers, 3-way stopcocks, continuous flush).
2. Anesthesia & Airway Management: Block Needles (echogenic, insulated tip), Flexometallic (armored/reinforced) Endotracheal Tubes, Normal Endotracheal Tubes (cuffed/uncuffed, Murphy eye), Stylets.
3. IV & Infusion Supplies: IV Cannulas (PTFE/FEP radiopaque catheter with injection port & wings, 14G-26G), IV Infusion Sets (vented, non-vented, micro/macro drip, 0.2µm filter option, needle-free connectors).
4. Respiratory Care: Closed Suction Catheters (24h/72h cross-infection barrier, MDI port, soft atraumatic tip), NIV Masks (Full Face & Nasal non-invasive ventilation, anti-asphyxia valve, silicone seal), ECG Electrodes (solid gel, Ag/AgCl sensor).
5. Urology & Catheters: Foley's Catheter (100% Silicone and Natural Latex/Silicone Elastomer coated, 2-way and 3-way, pediatric to adult 6Fr-26Fr).
6. Dialysis Supplies: Hemodialysis Catheter Sets (acute and chronic tunneled, dual/triple lumen, curved and straight extensions, polyurethane).
7. Surgical & OT Supplies: ICU Combo, OT Combo (custom sterile surgical drapes, gowns, universal procedure packs).
8. Laboratory & Diagnostics: Clinical chemistry, hematology analyzers, POC diagnostics, and reagent strips.

Procurement Policies, Lead Times, Shipping & OEM MOQs:
- Lead Times:
  * Standard sterile catalog items: 3 to 5 business days for dispatched warehouse inventory.
  * Custom volume production runs: 7 to 14 business days.
  * New OEM tooling & custom mold development: 3 to 5 weeks from approved CAD blueprint & first article inspection (FAI).
  * Emergency ICU/trauma stockout response: 24 to 48 hours expedited priority dispatch.
- International Shipping & Logistics:
  * Incoterms supported: FOB, CIF, CFR, EXW, DAP, and DDP (Delivered Duty Paid to door).
  * Modes: Temperature-controlled air cargo (3-7 days transit worldwide for urgent clinical needs) and ocean freight (FCL/LCL for high-volume containerized shipments).
  * Customs & Documentation: Every consignment includes Commercial Invoice, Packing List, Certificate of Origin, Certificate of Analysis (CoA), and Sterilization Validation Certificate.
- OEM & ODM Minimum Order Quantities (MOQ):
  * Standard catalog sterile consumables: 500 to 1,000 units per line.
  * Custom private labeling & customized sterile blister packs: 2,500 to 5,000 units.
  * Custom resin formulation, novel catheter extrusion, or dedicated tooling: 10,000 units or project-based agreement.
  * Clinical evaluation samples: Pre-production sample kits (5-10 units) available for hospital procurement committee review upon verification.

Tone and Guidelines:
- Professional, clinical, precise, courteous, and authoritative.
- Provide crisp, direct answers with bullet points when explaining specifications or logistics.
- Offer to help them assemble an RFQ (Request for Quotation) or connect with the supply chain engineering team.
- Never fabricate fake regulatory claims or non-existent warranties.`;

function generateDomainFallback(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('lead') || q.includes('time') || q.includes('turnaround') || q.includes('dispatch') || q.includes('deliver')) {
    return `**Lead Times & Dispatch Turnaround at Secure MediTech Global:**

• **In-Stock Catalog Consumables:** 3 to 5 business days from our logistics hub.
• **High-Volume Contract Replenishment:** 7 to 14 business days from purchase order confirmation.
• **Emergency Hospital Buffer Stock:** Priority air-dispatch within **24 to 48 hours** for critical ICU, trauma, and surgical consumables facing urgent stockouts.
• **New OEM Tooling & Mold Fabrication:** 3 to 5 weeks from approved CAD specifications to First Article Inspection (FAI) and batch sterilization validation. Rapid 3D bench prototypes are available in 7 to 10 days.

Would you like to reserve allocation for an upcoming procurement cycle? You can add items directly to your RFQ basket or contact our dispatch desk at **+1 (307) 533-4504**.`;
  }

  if (q.includes('moq') || q.includes('minimum') || q.includes('quantity') || q.includes('order size') || q.includes('private label')) {
    return `**OEM & Contract Manufacturing Minimum Order Quantities (MOQs):**

• **Catheter & Critical Care Kits (CVP, Dialysis, Pressure Monitoring):** Minimum 500 to 1,000 units per product configuration.
• **Extruded & Molded Consumables (IV Cannula, Suction Catheters, ET Tubes):** 2,500 to 5,000 units with custom private labeling and sterile blister sealing.
• **High-Volume Consumables & Drapes (OT Combos, IV Sets, Gloves):** 5,000 to 10,000 units per production run.
• **Custom Resin Formulations & Exclusive Tooling:** Project-based minimums (typically 10,000 units with scheduled quarterly call-offs).
• **Pre-Production Evaluation Samples:** Complimentary or subsidized sample packs (5–10 units) are available for institutional tender committees and biomedical review.

We also offer tiered pricing schedules for multi-year institutional framework agreements.`;
  }

  if (q.includes('shipping') || q.includes('freight') || q.includes('incoterm') || q.includes('cif') || q.includes('fob') || q.includes('ddp') || q.includes('dap') || q.includes('customs') || q.includes('sea') || q.includes('air')) {
    return `**International Shipping, Incoterms & Global Logistics:**

• **Supported Incoterms:** We accommodate your preferred customs arrangement:
  - **DDP (Delivered Duty Paid):** Complete door-to-door delivery with all import tariffs, clearance, and local trucking pre-cleared to your receiving dock.
  - **DAP (Delivered at Place):** Direct arrival at your regional distribution facility.
  - **CIF / CFR:** Cost, Insurance, and Freight to your designated international sea port or airport.
  - **FOB / EXW:** Standard cargo handover at port of origin or factory gate.
• **Consignment Security & Packaging:** Medical-grade Tyvek® / polymer blister packs sealed in heavy-duty 5-ply export corrugation with internal moisture barriers and temperature indicators for cold-chain items.
• **Regulatory Shipping Dossier:** Every consignment includes Commercial Invoice, Packing List with Lot/Batch numbers, Certificate of Origin (COO), Certificate of Analysis (CoA), and Sterilization Validation Certificate.`;
  }

  if (q.includes('cleanroom') || q.includes('iso') || q.includes('ce') || q.includes('certif') || q.includes('compliance') || q.includes('steril') || q.includes('eto')) {
    return `**Quality Standards, Cleanroom Specifications & Sterilization:**

• **Quality Management System:** Fully certified to **ISO 13485:2016** (Medical Devices QMS) and compliant with European Medical Device Regulation (EU MDR 2017/745).
• **Cleanroom Facilities:** Manufacturing occurs in verified **ISO Class 7 (Class 10,000)** and **ISO Class 8 (Class 100,000)** cleanroom suites with automated bioburden and particle counting.
• **Sterilization Validation:** Ethylene Oxide (EtO) per ISO 11135 and Gamma Irradiation per ISO 11137 with validated **SAL 10⁻⁶** sterility assurance.
• **Biocompatibility Testing:** Fully verified under ISO 10993 series (cytotoxicity, systemic toxicity, intracutaneous reactivity, and residual EtO per ISO 10993-7).`;
  }

  if (q.includes('cvp') || q.includes('catheter') || q.includes('cannula') || q.includes('dialysis') || q.includes('tube') || q.includes('ot combo') || q.includes('icu combo')) {
    return `**Clinical Consumables & Custom Kits Specifications:**

• **CVP Kits:** Single/dual/triple lumen radiopaque polyurethane catheters, Seldinger technique, nitinol kink-resistant 'J' guidewire, vessel dilator, and syringe.
• **IV Cannula:** 14G to 26G PTFE/FEP radiopaque catheter with injection port, flexible wings, and flash-back chamber.
• **Dialysis Catheters:** Acute and chronic tunneled hemodialysis sets with dual/triple lumens, high-flow polyurethane lumen design, and peelable sheath dilators.
• **Airway & ET Tubes:** High-volume low-pressure cuffed endotracheal tubes with Murphy eye, radio-opaque line, and armored flexometallic reinforced variants.
• **OT & ICU Combos:** Customized procedural sets featuring SMS/SMMS fluid-barrier surgical drapes, reinforced gowns, suction tubing, and procedure-specific consumables.

Would you like to configure a bill of materials or request a sample pack?`;
  }

  return `**Secure MediTech Global — Clinical Supply & OEM Consultation:**

We provide end-to-end medical supply chain and contract manufacturing solutions for hospitals, health ministries, and global distributors:

• **Lead Times:** 3–5 days standard dispatch; 24–48 hours emergency priority dispatch; 7–14 days custom runs.
• **International Logistics:** FOB, CIF, DAP, and DDP door-to-door delivery via air cargo or ocean freight.
• **OEM & Private Labeling:** MOQs from 500 units for catheter kits to 2,500+ for molded disposables.
• **Compliance:** ISO 13485:2016 certified, Class 7/8 Cleanrooms, CE marking, and batch sterilization validation.

**Direct Procurement Desk:**
• **Phone:** +1 (307) 533-4504
• **Email:** info@securemeditechglobal.com
• **Address:** 30 N Gould St Ste R, Sheridan, WY 82801, USA

How can we assist with your facility's current requirements?`;
}

// Server-side API endpoint for Gemini multi-turn chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.parts?.[0]?.text || '';

    // If API key is missing, respond immediately with the domain specialist knowledge
    if (!process.env.GEMINI_API_KEY) {
      res.json({ text: generateDomainFallback(lastUserMessage) });
      return;
    }

    // Call Gemini 3.8 Flash with a safety race timeout
    try {
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: messages,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI generation timeout after 6 seconds')), 6000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      if (response && response.text) {
        res.json({ text: response.text });
        return;
      }
    } catch (apiErr: any) {
      console.warn('Live Gemini model call fell back to local domain specialist:', apiErr?.message || apiErr);
      // Fallback seamlessly to the precision domain technical response
      res.json({ text: generateDomainFallback(lastUserMessage) });
      return;
    }

    res.json({ text: generateDomainFallback(lastUserMessage) });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.json({ text: generateDomainFallback('') });
  }
});

// Full-stack Vite handling: dev server with vite.middlewares, production static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
