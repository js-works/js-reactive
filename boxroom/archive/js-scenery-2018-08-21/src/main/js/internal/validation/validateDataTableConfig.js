import { Spec } from 'js-spec';

const tableConfigSpec =
    Spec.strictShape({
        columns:
            Spec.arrayOf( 
                Spec.or(
                    Spec.strictShape({
                        title: Spec.string,
                        field: Spec.string,
                        sortable: Spec.optional(Spec.boolean)
                    }),
                    Spec.strictShape({
                        title: Spec.string,
                        columns: Spec.lazy(() => tableConfigSpec.columns)
                    })
                ).usingHint('Must be a valid column configuration'))
    });


export default function validateDataTableConfig(config) {
    return tableConfigSpec(config, '');
}