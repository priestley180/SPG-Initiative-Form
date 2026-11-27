'use strict';
window.formConfig = {
 type: 'intake',
 title: 'Intake Form',
 storageKey: 'spg-intake-v1',
 sections: [{
  title: 'Intake Form',
  navLabel: 'Intake questions',
  note: 'As part of the Product Operating Model, we want to ensure focus on outcome-based product work, continuous discovery, and empowered product teams. To achieve this, any new feature or improvement request must include a clear problem statement and success metrics, which can be assessed by the product team before committing to delivery.',
  fieldsAsTable: true,
  fields: [
   'Submitted by:',
   'What problem or opportunity have you identified?',
   'Who is affected?',
   'What evidence do you have that we should solve this problem?',
   'What business or user outcome is this aligned to?',
   'What does success look like?',
   'Any other information we should know?'
  ]
 }],
 hints: {
  'What evidence do you have that we should solve this problem?': 'Examples: Product data & insight; Competitor analysis; Operational need; User feedback.',
  'Any other information we should know?': 'Examples: Dependencies; Legal or compliance issue; Commercial agreements; Timelines.'
 }
};
