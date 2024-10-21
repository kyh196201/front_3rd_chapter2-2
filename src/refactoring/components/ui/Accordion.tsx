import { PropsWithChildren } from 'react';

type AccordionProps = {
  // TODO: testId props를 추가하는 방법 말고 좋은 방법이 있는지 확인 필요
  testId: string;
  // TODO: ReactNode로 타입 변경하기
  title: string;
  isOpen: boolean;
  onToggle: () => void;
};

export const Accordion = ({ title, isOpen, children, testId, onToggle }: PropsWithChildren<AccordionProps>) => {
  const handleClickToggleButton = () => {
    onToggle();
  };

  return (
    <div data-testid={testId} className="bg-white p-4 rounded shadow">
      <button data-testid="toggle-button" onClick={handleClickToggleButton} className="w-full text-left font-semibold">
        {title}
      </button>

      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};
