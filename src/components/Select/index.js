const Select = ({ register, name, className, options, ...rest }) => {
  return (
    <>
      <select
        id={name}
        name={name}
        className={className}
        {...register(name, { required: true })}
        {...rest}
      >
        {options.map(({ id, name }) => (
          <option key={id} value={name}>{name}</option>
        ))}
      </select>
    </>
  );
};
export default Select;
