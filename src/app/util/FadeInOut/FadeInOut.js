import { motion } from 'framer-motion';
import { PureComponent } from 'react';

export function fadeInOut(Component) {
    return class extends PureComponent {
        render() {
            return (
                <motion.div
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  exit={ { opacity: 0 } }
                  transition={ { duration: 0.15 } }
                >
                    <Component { ...this.props } />
                </motion.div>
            );
        }
    };
}

export default fadeInOut;
