import styled from "@emotion/styled";
import { useGalaxyContext } from "../contexts/GalaxyContext";

const MetaContainer = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 320px;
  height: 160px;
  max-width: 40vw;
  max-height: 20vw;
  color: #0000004b;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const MeatTextContainer = styled.div`
  color: white;
  text-align: center;
`;

const StarMetaDisplay: React.FC = () => {
  const galaxyContext = useGalaxyContext();
  const { hoverStar } = galaxyContext;

  return (
    <>
      {hoverStar && hoverStar.id !== "" ? (
        <MetaContainer>
          <MeatTextContainer>{hoverStar.id}</MeatTextContainer>
        </MetaContainer>
      ) : null}
    </>
  );
};

export default StarMetaDisplay;
