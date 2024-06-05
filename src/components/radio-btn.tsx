type Props = {
  value: string;
  label: string;
  defaultChecked?: boolean;
  Icon: any;
  onClick: () => void;
};

export function RadioBtn({
  Icon,
  label,
  value,
  defaultChecked,
  onClick,
}: Props) {
  return (
    <label className="radio-btn">
      <span className="icon">
        <Icon />
      </span>
      <input
        type="radio"
        name="category"
        value={value}
        onClick={onClick}
        defaultChecked={defaultChecked}
        className="hidden"
      />
      <span>{label}</span>
    </label>
  );
}
