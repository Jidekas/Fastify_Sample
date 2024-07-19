const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../prisma', 'schema.prisma');
const auditFieldsTemplate = `
  {createdAtField}
  createdBy String @default("system")
  {updatedAtField}
  updatedBy String @default("system")
  isDeleted Boolean @default(false)
  deletedOn DateTime?
  deletedBy String?
`;

fs.readFile(schemaPath, 'utf8', (err, data) => {
  if (err) throw err;

  const modelRegex = /model\s+\w+\s*{[^}]*}/g;
  let updatedSchema = data.replace(modelRegex, (model) => {
    const hasCreatedAt = model.includes('createdAt');
    const hasUpdatedAt = model.includes('updatedAt');

    // Construct the audit fields based on the presence of createdAt and updatedAt
    let auditFields = auditFieldsTemplate
      .replace('{createdAtField}', hasCreatedAt ? '' : 'createdAt DateTime @default(now())')
      .replace('{updatedAtField}', hasUpdatedAt ? '' : 'updatedAt DateTime? @updatedAt');

    // Remove extra newlines if fields are omitted
    auditFields = auditFields.replace(/^\s*\n/gm, '');

    return model.replace(/(\}\s*)$/, `${auditFields}\n$1`);
  });

  fs.writeFile(schemaPath, updatedSchema, 'utf8', (err) => {
    if (err) throw err;
    console.log('Schema updated with audit fields.');
  });
});
