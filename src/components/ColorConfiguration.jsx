import React, { useContext, useState } from 'react'
import { AppContext } from '../AppProvider';

// ColorConfiguration component allows users to configure and customize color settings.
// Users can reset to original colors or save their customized colors.

// The ColorConfiguration component.
const ColorConfiguration = () => {
    const { colors, setColors, original_colors } = useContext(AppContext)

    const [colorValues, setColorValues] = useState(colors);

    // Resets the color values to the original colors.
    function reiniciarColores() {
        setColors(original_colors.current);
    }

    // Saves the customized color values.
    function saveColors() {
        setColors(colorValues);
    }

    // Handles the change event for color input fields.
    const colorChangeHander = (e) => {
        const {name, value} = e.target;
        setColorValues({
            ...colorValues,
            [`${name}`]: value
        })
    }

    return (
        <div className="modal fade" id="configurationModal" tabIndex="-1" data-bs-backdrop="static"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 data-i18n="config_modal_title" className="modal-title fs-5" id="exampleModalLabel">🔩 Configuración</h1>
                    </div>
                    <div className="modal-body">
                        <form className="form" id="colorForm">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label data-i18n="config_vertical_setting" htmlFor="colorC" className="form-label">Palabra vertical:</label>
                                    <input type="color" className="form-control form-control-color w-100" id="colorC" name="--c"
                                        value={colorValues['--c']} onChange={colorChangeHander} />
                                </div>
                                <div className="col-md-6">
                                    <label data-i18n="config_border_setting" htmlFor="colorD" className="form-label">Borde de las celdas:</label>
                                    <input type="color" className="form-control form-control-color w-100" id="colorD" name="--d"
                                        value={colorValues['--d']} onChange={colorChangeHander} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label data-i18n="config_empty_cell_setting" htmlFor="colorE" className="form-label">Celdas vacías:</label>
                                    <input type="color" className="form-control form-control-color w-100" id="colorE" name="--e"
                                        value={colorValues['--e']} onChange={colorChangeHander} />
                                </div>
                                <div className="col-md-6">
                                    <label data-i18n="config_correct_cell_setting" htmlFor="colorF" className="form-label">Palabra correcta/hover:</label>
                                    <input type="color" className="form-control form-control-color w-100" id="colorF" name="--f"
                                        value={colorValues['--f']} onChange={colorChangeHander} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-evenly align-items-center">
                        <button data-i18n="config_reset_settings" type="button" className="btn btn-primary d-flex align-items-center" onClick={reiniciarColores}>
                            🔄 Reiniciar valores
                        </button>
                        <button data-i18n="config_save_settings" type="button" className="btn btn-primary d-flex align-items-center" onClick={saveColors}>
                            💽 Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorConfiguration
