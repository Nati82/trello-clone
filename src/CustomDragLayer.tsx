import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { DragItem } from "./DragItem";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  const chooseColumnOrCard= (item: DragItem) => {
    return item.type === "COLUMN" ? (
        <Column id={item.id} text={item.text} isPreview />
      ) : (
        <Card
          columnId={item.columnId}
          isPreview
          id={item.id}
          text={item.text}
        />
      )
  }

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {chooseColumnOrCard(draggedItem)}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
