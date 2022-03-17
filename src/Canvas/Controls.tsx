import styled from "styled-components";

type Props = {};

const Controls = (props: Props) => {
  return (
    <div>
      <Instructions>
        <h1>Controls</h1>
        <Command>Click an Anchor to edit it</Command>
        <Command>Hold "H" to hide Anchors</Command>
        <Command>"CTRL" + Click To create new anchor</Command>
        <Command>
          "SHIFT" + Click on existing Anchors To create new clusters
        </Command>
        <Command>"D" + Click to delete anchor</Command>
        <Command>Press "S" to save to current tab</Command>
        <Command>
          Navigate Different saves by clicking the numbers or by pressing
          numbers 1-3 on the key board
        </Command>
      </Instructions>
    </div>
  );
};

export default Controls;

const Instructions = styled.div`
  margin-left: 30px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;
const Command = styled.div`
  margin: 10px;
  margin-left: 0;
  padding: 15px;
  border-radius: 20px;
  background-color: #f2f2f2;
  max-width: 400px;
`;
