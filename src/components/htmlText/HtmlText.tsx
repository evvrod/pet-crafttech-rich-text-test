import { forwardRef } from 'react';

import { Figure } from '../../types/types';

interface IHtmlTextProps {
  figure: Figure;
  id: string;
}

function HtmlTextFunction(
  { figure, id }: IHtmlTextProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: figure.html }}
      style={{
        position: 'fixed',
        overflow: 'hidden',
        left: '100000px',
        top: '100000px',
        width: figure.widthText,
        height: figure.heightText,
      }}
      ref={ref}
    ></div>
  );
}

const HtmlText = forwardRef(HtmlTextFunction);

export default HtmlText;
