import { forwardRef } from 'react';

interface IHtmlTextProps {
  html: string;
  id: string;
}

function HtmlTextFunction(
  { html, id }: IHtmlTextProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: 'fixed',
        overflow: 'hidden',
        left: '100000px',
        top: '100000px',
      }}
      ref={ref}
    ></div>
  );
}

const HtmlText = forwardRef(HtmlTextFunction);

export default HtmlText;
