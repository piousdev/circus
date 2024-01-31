interface IframeContent {
  documentTitle: string;
  cssContent: string;
  htmlContent: string;
  jsContent: string;
}

/**
 * Generates the source document for the iframe.
 *
 * @param {IframeContent} content - The content of the iframe.
 * @returns {string} The source document for the iframe.
 */
const getIframeSrcDoc = ({
  documentTitle,
  cssContent,
  htmlContent,
  jsContent,
}: IframeContent): string => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${documentTitle}</title>
            <style>${cssContent}</style>
        </head>
        <body class='iframeBody'>
            ${htmlContent}
            <script>
              ${jsContent}
            </script>
        </body>
        </html>
      `;
};

export default getIframeSrcDoc;
