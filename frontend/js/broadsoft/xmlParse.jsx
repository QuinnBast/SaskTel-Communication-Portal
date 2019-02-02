
export function getTag(xml, tagName){
    /**
     * Gets an xmlJS object's tag value for the specified tag if the tag exists.
     *
     * @param xml: The XMLJS object
     * @param tagName: An array of xml tags to search for.
     */
    //Loop through the XMLJS object's elements.
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


export function setTag(xml, tagName, tagValue){
    /**
     * Sets the value of an XMLJS object's tag with the value specified.
     *
     * @param xml: The XMLJS object
     * @param tagName: An array of xml tags to search for.
     * @param tagValue: The value to set the tag to
     */
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
    return false;
}