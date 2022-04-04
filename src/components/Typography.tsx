import styled, { css } from 'styled-components';

export const Typography = styled.span<{
  color?: string;
  size?: number;
  lineHeight?: number;
  weight?: any;
  align?: 'center' | 'left' | 'justify';
  mt?: number;
  mb?: number;
  mdSize?: number;
  mdLineHeight?: number;
  xsSize?: number;
  xsLineHeight?: number;
  block?: boolean;
}>`
  font-style: normal;
  font-weight: ${(p) => `${p.weight || 'normal'}`};
  font-size: ${(p) => `${p.size || 14}px`};
  line-height: ${(p) => `${p.lineHeight || 31}px`};
  text-align: ${(p) => `${p.align || 'left'}`};
  color: ${(p) => `${p.color || '#fff'}`};
  display: ${(p) => `${p.block && 'block'}`};
  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}

  ${(p) =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}px;
    `}
  @media (max-width:1024px) {
    font-size: ${(p) => `${p.mdSize || p.size || 18}px`};
    line-height: ${(p) => `${p.mdLineHeight || p.lineHeight || 21}px`};
  }
  @media (max-width: 640px) {
    font-size: ${(p) => `${p.xsSize || p.mdSize || p.size || 18}px`};
    line-height: ${(p) => `${p.xsLineHeight || p.mdLineHeight || p.lineHeight || 21}px`};
  }
`;

export const TypographyDiv = styled.div<{
  color?: string;
  size?: number;
  lineHeight?: number;
  weight?: any;
  align?: 'center' | 'left' | 'justify';
  mt?: number;
  mb?: number;
  mdSize?: number;
  mdLineHeight?: number;
  xsSize?: number;
  xsLineHeight?: number;
}>`
  font-style: normal;
  font-weight: ${(p) => `${p.weight || 'normal'}`};
  font-size: ${(p) => `${p.size || 14}px`};
  line-height: ${(p) => `${p.lineHeight || 31}px`};
  text-align: ${(p) => `${p.align || 'left'}`};
  color: ${(p) => `${p.color || '#fff'}`};

  ${(p) =>
    p.mt &&
    css`
      margin-top: ${p.mt}px;
    `}

  ${(p) =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}px;
    `}
  @media (max-width:1024px) {
    font-size: ${(p) => `${p.mdSize || p.size || 18}px`};
    line-height: ${(p) => `${p.mdLineHeight || p.lineHeight || 21}px`};
  }
  @media (max-width: 640px) {
    font-size: ${(p) => `${p.xsSize || p.mdSize || p.size || 18}px`};
    line-height: ${(p) => `${p.xsLineHeight || p.mdLineHeight || p.lineHeight || 21}px`};
  }
`;
