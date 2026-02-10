import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import type { ProcessCard } from '../../types/quotation';
import { CoatingProcessCard } from './CoatingProcessCard';

interface ProcessCardDragContainerProps {
  processCards: ProcessCard[];
  totalQty: number;
  onReorder: (reorderedCards: ProcessCard[]) => void;
  onUpdateCard: (id: string, data: Partial<ProcessCard['data']>) => void;
  onRemoveCard: (id: string) => void;
}

export const ProcessCardDragContainer: React.FC<ProcessCardDragContainerProps> = ({
  processCards,
  totalQty,
  onReorder,
  onUpdateCard,
  onRemoveCard,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(processCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const reorderedWithNewOrder = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    onReorder(reorderedWithNewOrder);
  };

  if (processCards.length === 0) {
    return (
      <div
        style={{
          padding: '32px 20px',
          textAlign: 'center',
          border: '2px dashed #E2E8F0',
          borderRadius: '10px',
          background: 'rgba(248, 250, 252, 0.5)',
        }}
      >
        <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '4px', fontWeight: 500 }}>
          No coating processes added yet
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
          Select coating types from the dropdown above to add processes
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="process-cards">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: snapshot.isDraggingOver ? '8px' : '0',
              background: snapshot.isDraggingOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
              borderRadius: '12px',
              transition: 'all 0.2s',
            }}
          >
            {processCards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: snapshot.isDragging ? '12px' : '0',
                    }}
                  >
                    <CoatingProcessCard
                      processCard={card}
                      orderNumber={index + 1}
                      totalQty={totalQty}
                      allProcessCards={processCards}
                      onUpdate={onUpdateCard}
                      onRemove={onRemoveCard}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
