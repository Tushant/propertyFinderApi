import React from 'react';
import EarthSpinning from 'assets/img/earthSpinning.svg';

const Loader = () =>
  <div className="earth-spinning">
    <img src={EarthSpinning} alt="spinner" style={{ margin: '0 auto' }} />
  </div>;

// const Loader = prop => WrappedComponent => {
//   return class ClassLoader extends React.PureComponent {
//     render() {
//       if (this.props.isRequesting) {
//         return <Spinner/>
//       }
//       return <WrappedComponent {...this.props}/>
//
//     }
//   }
// };
// render() {
//   return this.props[prop]
//     ? <div className="earth-spinning">
//       <img src={EarthSpinning} alt="spinner" style={{ margin: '0 auto' }} />
//     </div>
//     : <WrappedComponent {...this.props} />;
// }
// };

export default Loader;
