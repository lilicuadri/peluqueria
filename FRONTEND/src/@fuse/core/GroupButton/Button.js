import Button from '@mui/material/Button';

import React, { Fragment } from 'react';

const Buttons = ({ Cancelar, Guardar ,EstadoCancelar ,EstadoGuardar}) => {
	return (
		<Fragment>
			<div className="pb-3">
				<Button
					onClick={() => Guardar()}
					type="button"
					className="mr-2"
					disabled={EstadoGuardar ?  EstadoGuardar : false}
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">
						{' '}
						Guardar
					</span>
				</Button>
				<Button
					type="button"
					onClick={() => Cancelar('Cancelar')}
					disabled={EstadoCancelar ?  EstadoCancelar : false}
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">
						Cancelar
					</span>
				</Button>
			</div>
		</Fragment>
	);
};

export default Buttons;