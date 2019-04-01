
let xmljs = require('xml-js');

export function getTag(xml, XmlLocation){
    /**
     * Gets an xmlJS object's tag value for the specified tag if the tag exists.
     *
     * @param xml: The XMLJS object
     * @param tagName: An array of xml tags to search for.
     */
    //Loop through the XMLJS object's elements.
    let tagName = JSON.parse(JSON.stringify(XmlLocation));
    for (let element of xml.elements) {
        if (element.name === tagName[0]) {
            tagName.shift();
            // Check if there are more tags to parse.
            if(tagName.length > 0){
                return getTag(element, tagName)
            } else {
                // Check if the element has an associated value.

                // Check if the tag has an element to access.
                if(element.elements.length !== 1){
                    return element;
                }

                // Check if the tag's first element is a value.
                let type = element.elements[0].type;
                if(type !== "element"){
                    // Get the value from the element.
                    return element.elements[0][type];
                }

                // Otherwise, return the element.
                return element;
            }
        }
    }
    // If nothing was found, return null
    return null;
}


export function setTag(xml, XmlLocation, tagValue){
    /**
     * Sets the value of an XMLJS object's tag with the value specified.
     *
     * @param xml: The XMLJS object
     * @param tagName: An array of xml tags to search for.
     * @param tagValue: The value to set the tag to
     */
    let tagName = JSON.parse(JSON.stringify(XmlLocation));
    //Loop through the XMLJS object's elements.
    for(let element of xml.elements){
        if(element.name === tagName[0]){
            tagName.shift();
            // Check if there are more tags to parse.
            if(tagName.length > 0){
                return setTag(element, tagName, tagValue)
            } else {
                // Get the value element.
                let valueElement = element.elements[0];

                let type = valueElement.type;
                valueElement[type] = tagValue;
                return true;
            }
        }
    }
    // Create the tag and set the value.
    let newTag = {"type":"element","name":tagName[0],"elements":[{"type":"text","text":tagValue}]};
    // Add the new tag to the XML
    xml.elements.push(newTag);
    return true;
}

/**
 * Creates a basic Xml structure of <Root><value>value</value></Root>
 * @param xmlStructure An array of strings indicating the xml structure
 * @param value The value of the inner element
 */
export function generateXml(xmlStructure, value){
    let xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
    xml += "<" + xmlStructure[0] + " xmlns=\"http://schema.broadsoft.com/xsi\"><" + xmlStructure[1] + ">" + value + "</" + xmlStructure[1] + "></" + xmlStructure[0] + ">";
    return xmljs.xml2js(xml);
}

export function generateKeyValueXml(rootName, entryName, keyName, keyValue, valueName, value){
    let xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>";
    xml += "<" + rootName + " xmlns=\"http://schema.broadsoft.com/xsi\">" +
        "<" + entryName + ">" +
        "<" + keyName + ">" + keyValue + "</" + keyName + ">" +
        "<" +  valueName + ">" +  value + "</" + valueName + ">" +
        "</" + entryName + ">" +
        "</" + rootName + ">";
    return xmljs.xml2js(xml);
}