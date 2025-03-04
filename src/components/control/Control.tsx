import { Tool } from '../../types/types';

interface IControlProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
}

export default function Control(props: IControlProps) {
  const { tool, setTool } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value as Tool);
  };

  return (
    <div style={{ position: 'absolute', top: 0 }}>
      <div>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === 'cursor'}
          onChange={handleOnChange}
        />
        <label htmlFor="cursor">Взаимодействие</label>
      </div>

      <div>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === 'shape'}
          onChange={handleOnChange}
        />
        <label htmlFor="shape">Добавление</label>
      </div>
    </div>
  );
}
