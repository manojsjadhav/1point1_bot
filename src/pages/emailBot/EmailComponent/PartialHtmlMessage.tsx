import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const PartialHtmlMessage = ({ html }: { html: string }) => {
  const [safeHtml, setSafeHtml] = useState('');

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Get all <p class="MsoNormal"> tags
    const allParagraphs = Array.from(doc.querySelectorAll('p.MsoNormal'));

    // Filter out empty paragraphs (e.g., only &nbsp;)
    const meaningfulParagraphs = allParagraphs.filter(p => {
      const text = p.textContent?.replace(/\u00a0|\s/g, '').trim(); // remove &nbsp; and whitespace
      return text !== '';
    });

    // Get the first non-empty paragraph only
    const firstMeaningful = meaningfulParagraphs[0];

    // Sanitize and set
    if (firstMeaningful) {
      const cleanHtml = DOMPurify.sanitize(firstMeaningful.outerHTML);
      setSafeHtml(cleanHtml);
    }
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
};

export default PartialHtmlMessage;
