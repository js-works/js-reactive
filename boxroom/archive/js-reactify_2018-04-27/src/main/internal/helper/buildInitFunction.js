export default function buildInitFunction(componentClass, meta) {
    class CustomComponent extends componentClass {
        constructor(props) {
            super(props);
        }
    }

    CustomComponent.prototype.___meta = meta;

    return (updateView, updateState) => {
        let component = null;

        const
            setProps = props => {
                if (!component) {
                    component = new CustomComponent(props);
                    component.___init(updateView, updateState);
                    component.componentWillMount();
                } else {
                    if (component.shouldComponentUpdate(props, component.state)) {
                        component.componentWillUpdate();
                    }
                }

                updateView(
                    component.render(),
                    meta.provides ? component.getChildContext() : null,
                    component.___callbackWhenUpdated);
            },

            close = () => {
                if (component) {
                    component.componentWillUnmount();
                    component = null;
                }
            };


        const ret = { setProps, close };

        if (meta.methods) {
            ret.applyMethod = (methodName, args) => {
                return component
                    ? component[methodName](...args)
                    : undefined; 
            };
        }

        return ret;
    };
}
