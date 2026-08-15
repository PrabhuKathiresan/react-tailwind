const e="RadioSwitch",l=`GPU-accelerated Radio Switch with perfect highlight alignment.
Supports wrapping, icons, descriptions, and dark mode.`,n=[{name:"label",type:"string",raw:"string",enumValues:null,required:!1,defaultValue:null,description:`Accessible label for the group.
Used internally for aria-label.`},{name:"selected",type:"string",raw:"string",enumValues:null,required:!0,defaultValue:null,description:`The currently selected value.
Makes this a controlled component.`},{name:"items",type:"RadioSwitchItem[]",raw:"RadioSwitchItem[]",enumValues:null,required:!0,defaultValue:null,description:`List of switch options.
Can be:
- an array of strings
- an array of objects with label/value/description`},{name:"switchClass",type:"string",raw:"string",enumValues:null,required:!1,defaultValue:null,description:""},{name:"wrapperClass",type:"string",raw:"string",enumValues:null,required:!1,defaultValue:null,description:""},{name:"contentClass",type:"string",raw:"string",enumValues:null,required:!1,defaultValue:null,description:""},{name:"descriptionClass",type:"string",raw:"string",enumValues:null,required:!1,defaultValue:null,description:""}],a={name:e,description:l,props:n};export{a as default,l as description,e as name,n as props};
