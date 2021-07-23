import { keyframes } from "styled-components";

export const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SlideUp = keyframes`
from {
  transform: translateY(150%);
}
to {
  transform: translateY(0);
}
`;
