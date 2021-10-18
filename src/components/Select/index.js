const Select = ({ register, name, className, options, ...rest }) => {
  return (
    <>
      <select
        name={name}
        className={className}
        {...register(name, { required: true })}
        {...rest}
      >
        {options.map(({ id, name }) => (
          <option key={id}>{name}</option>
        ))}
      </select>
    </>
  );
};
export default Select;
