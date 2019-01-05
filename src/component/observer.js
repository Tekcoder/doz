//const proxy = require('../utils/proxy');
const proxy = require('proxio/index');
const events = require('./hooks');
const updateBoundElements = require('./update-bound-element');
const propsListener = require('./props-listener');

function sanitize(str) {
    return typeof str === 'string'
        ? str
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
        : str;
}

function create(instance) {
    instance._props = proxy.create(instance._rawProps,
        change => {
            if (!instance._isRendered) return;
            const changes = [change];
            const res = events.callBeforeUpdate(instance, changes);
            console.log('uapda', changes)

            setTimeout(()=> {
                events.callUpdate(instance, changes);
                instance.render();
                propsListener(instance, changes);
                updateBoundElements(instance, changes);
            });
            return res !== false;
        },
        (value, oldValue, currentPath) => {

            //value = sanitize(value);

            if (instance.propsConvert) {
                if (typeof instance.propsConvert === 'object') {
                    const propPath = instance.propsConvert[currentPath];
                    const func = instance[propPath] || propPath;
                    if (typeof func === 'function') {
                        return func.call(instance, value, oldValue)
                    }
                }
            }

            if (instance.propsComputed) {
                if (typeof instance.propsComputed === 'object') {
                    let cached = instance._computedCache.get(currentPath);
                    if (cached === undefined) {
                        cached = new Map();
                        instance._computedCache.set(currentPath, cached);
                    } else {
                        const cachedValue = cached.get(value);
                        if (cachedValue !== undefined) {
                            return cachedValue;
                        }
                    }
                    const propPath = instance.propsComputed[currentPath];
                    const func = instance[propPath] || propPath;
                    if (typeof func === 'function') {
                        const result = func.call(instance, value, oldValue);
                        cached.set(value, result);
                        return result;
                    }
                }
            }
            return value;
        }
    );
}

function _create(instance) {

    if (instance._props.__isProxy)
        proxy.remove(instance._props);

    instance._props = proxy.create(instance._rawProps, null,
        changes => {
            if (!instance._isRendered) return;
            events.callUpdate(instance, changes);
            instance.render();
            propsListener(instance, changes);
            updateBoundElements(instance, changes);
        },
        (value, oldValue, currentPath) => {
            if (instance.propsConvert) {
                if (typeof instance.propsConvert === 'object') {
                    const propPath = instance.propsConvert[currentPath];
                    const func = instance[propPath] || propPath;
                    if (typeof func === 'function') {
                        return func.call(instance, value, oldValue)
                    }
                }
            }

            if (instance.propsComputed) {
                if (typeof instance.propsComputed === 'object') {
                    let cached = instance._computedCache.get(currentPath);
                    if (cached === undefined) {
                        cached = new Map();
                        instance._computedCache.set(currentPath, cached);
                    } else {
                        const cachedValue = cached.get(value);
                        if (cachedValue !== undefined) {
                            return cachedValue;
                        }
                    }
                    const propPath = instance.propsComputed[currentPath];
                    const func = instance[propPath] || propPath;
                    if (typeof func === 'function') {
                        const result = func.call(instance, value, oldValue);
                        cached.set(value, result);
                        return result;
                    }
                }
            }
            return value;
        });

    proxy.beforeChange(instance._props, changes => {
        const res = events.callBeforeUpdate(instance, changes);
        if (res === false)
            return false;
    });
}

module.exports = {
    create
};