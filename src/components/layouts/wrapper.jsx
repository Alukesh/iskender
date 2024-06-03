import '../../styles/layout/wrapper.scss';

const Wrapper = ({ children }) => {
  return (
    <div className='container'>
      <div>{children}</div>
    </div>
  );
};

export default Wrapper;
