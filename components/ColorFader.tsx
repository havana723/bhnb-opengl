import styled from "@emotion/styled";

const Blend = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
  opacity: 50%;
`;

const Blend1 = styled(Blend)`
  background-color: #1d31a520;
  mix-blend-mode: screen;
`;

const Blend2 = styled(Blend)`
  background: linear-gradient(to bottom, transparent 60%, #61c5ff22);
  mix-blend-mode: screen;
`;

const Blend3 = styled(Blend)`
  background: linear-gradient(to bottom, transparent 90%, #ffe0aa10);
  mix-blend-mode: screen;
`;

const ColorFader: React.FC = () => {
  return (
    <>
      <Blend1 />
      <Blend2 />
      <Blend3 />
    </>
  );
};

export default ColorFader;
