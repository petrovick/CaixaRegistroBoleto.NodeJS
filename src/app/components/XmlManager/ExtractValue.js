class XmlManager {
    async GetXmlNodeValue(xmlDoc, tagNameString) {
        const tagNames = tagNameString.split(".");
        var xmlDocCopy = xmlDoc;
        let isXmlValid = true;
        tagNames.forEach(tagName => {
            if(xmlDocCopy.getElementsByTagName(tagName).length <= 0)
            {
                isXmlValid = false;
                return '';
            }
            xmlDocCopy = xmlDocCopy.getElementsByTagName(tagName)[0];
        });
        if(!isXmlValid)
        {
            return null;
        }
        /*
        tagNames.forEach(function(tagName, index, array) {
            xmlDocCopy = xmlDocCopy.getElementsByTagName(tagName)[0];
        });
        */
       if(xmlDocCopy && xmlDocCopy.childNodes.length > 0)
       {
            var childNodes = xmlDocCopy.childNodes[0];
            if(childNodes) {
                return childNodes.nodeValue;
            }

       }
       return '';
    }
}
module.exports = new XmlManager();
