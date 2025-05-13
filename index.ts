import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

async function generatePdf() {
  try {
    const invoiceData = {
      invoiceNumber: "20245/2025",
      legalName: "Brighton Medical Transport Ltd.",
      address: "12A, Queen Victoria Street",
      city: "Brighton",
      postalCode: "BN1 3XG",
      date: "13 May 2025",
      items: [
        {
          description: 'Managed Account Service "Premium"',
          periodStart: "13/05/2025",
          periodEnd: "12/05/2026",
          unitPrice: "620.00",
          quantity: "1.00",
          amountExclTax: "620.00",
        },
      ],
      paymentDeadline: "31/05/2025",
      totalExclTax: "620.00",
      totalVat: "124.00",
      totalInclTax: "744.00",
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const filePath = path.join(__dirname, "template.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");

    // Inject vars in the HTML template with Handlebars
    const template = handlebars.compile(htmlContent);
    const htmlWithVariables = template(invoiceData);

    await page.setContent(htmlWithVariables, {
      waitUntil: "domcontentloaded",
    });

    const footerTemplate = `
    <footer style="color: lightgray; font-size: 14px; text-align: center; width: 100%; font-family: Arial, sans-seif">
      <p style="margin: 2px">Example Company - Address</p>
    </footer>
     `;

    const headerTemplate = `
      <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
        <p style="font-size: 32px">Example Company</p>
      </div>
   `;

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: footerTemplate,
      headerTemplate: headerTemplate,
      pageRanges: "1-1",
      margin: {
        top: "40px",
        bottom: "40px",
        left: "40px",
        right: "40px",
      },
    });

    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/pdf") {
      const pdfBuffer = await generatePdf();

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=invoice.pdf",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});
