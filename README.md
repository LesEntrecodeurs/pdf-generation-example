# pdf-generation-example

## [Handlebars](https://handlebarsjs.com/)

Allows you to insert variables into HTML templates.

In the example, we use the `compile` function in this way:

```ts
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

const template = handlebars.compile(htmlContent);
const htmlWithVariables = template(invoiceData);
```

See this link for more details on the `compile` function: <https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options>

## [Puppeteer](https://pptr.dev/)

Using the [PDF generation](https://pptr.dev/guides/pdf-generation) functionality

See the various options available for PDF generation in Puppeteer : <https://pptr.dev/api/puppeteer.pdfoptions>

---

## Test

Install dependencies :

```bash
bun install
```

Start the server :

```bash
bun run index.ts
```
