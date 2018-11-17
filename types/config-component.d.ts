export default interface ConfigComponent {
    /**
     * A name that identify the children component.
     */
    alias?: string

    /**
     * If true, create the child components.
     */
    autoCreateChildren?: boolean

    /**
     * An object that contains local components.
     */
    components?: object

    /**
     * A unique name that identify the component inside the app.
     */
    id?: string

    /**
     * Mixin
     */
    mixin?: object | Array<object>

    /**
     * An object that contains component style in object literal.
     * @deprecated since 1.8.0 in favor of tag style inside template function
     */
    style?: object

    /**
     * An unique store name to expose the props with other components of the app.
     */
    store?: string

    /**
     * An object for detect props changes
     */
    propsListener?: object

    /**
     * This object allow to sharing things between components.
     */
    shared?: object;
}