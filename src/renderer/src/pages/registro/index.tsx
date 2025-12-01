import React, { useState } from 'react';

// Estilos de Tailwind personalizados para simular los campos del acta
const inputStyle = "border-b border-dashed border-blue-500 p-0.5 mx-1 bg-blue-50 text-blue-800 font-semibold inline-block focus:outline-none focus:border-solid focus:border-blue-700 transition-all rounded-sm text-sm";

const InputField = ({ id, placeholder, type = "text", sizeClass = "w-48", value, onChange }) => (
    <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${inputStyle} ${sizeClass}`}
        value={value}
        onChange={onChange}
    />
);

// Componente para seleccionar el valor de cumplimiento (0, 1, 2, ---)
const ComplianceSelector = ({ id, value, onChange }) => {
    const options = [
        { label: '2 (Cumple Totalmente)', value: '2', color: 'bg-green-100 text-green-800' },
        { label: '1 (Cumple Parcialmente)', value: '1', color: 'bg-yellow-100 text-yellow-800' },
        { label: '0 (No cumple)', value: '0', color: 'bg-red-100 text-red-800' },
        { label: '--- (No aplica)', value: '---', color: 'bg-gray-100 text-gray-800' },
    ];

    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            className={`w-40 text-sm p-1 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors ${options.find(opt => opt.value === value)?.color || 'bg-white'}`}
        >
            <option value="" disabled>Seleccione...</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

const App = () => {
    // Estado para gestionar todos los campos del formulario
    const [formData, setFormData] = useState({
        // 1. Cabecera y Datos de Apertura
        expediente: '',
        actaNumero: '',
        lugarDiligencia: '',
        horaInicio: '', // Hora 1: Inicio de Acta
        horaNotificacion: '', // Hora 2: Notificación
        horaInspeccion: '',   // Hora 3: Inicio de Inspección
        dia: '',
        mes: '',
        anio: '',
        ordenVerificacion: '',
        fechaOrden: '',
        emisorOrden: '',
        caracterEmisor: '',
        verificadores: '',
        adscripcion: '',
        credencialNumero: '',
        fechaExpedicion: '',
        vigenciaCredencial: '',

        // 2. Datos del Establecimiento
        nombreEstablecimiento: '',
        giroActividad: '',
        rfcEstablecimiento: '',
        calle: '',
        numero: '',
        colonia: '',
        municipio: '',
        codigoPostal: '',
        propietario: '',

        // 3. Persona que Atiende la Visita
        nombreOcupante: '',
        identificacionOcupante: '',
        domicilioOcupante: '',
        caracterOcupante: '',

        // 4. Objeto y Alcance
        objetoAlcance: '',
        
        // 5. Matriz de Verificación (Añadido)
        // Valores de Cumplimiento (0, 1, 2, ---) para los 23 puntos (15 al 37)
        v15: '', v16: '', v17: '', v18: '', v19: '', v20: '', v21: '', v22: '', v23: '', v24: '', 
        v25: '', v26: '', v27: '', v28: '', v29: '', v30: '', v31a: '', v31b: '', v31c: '', v31d: '', 
        v32: '', v33: '', v34: '', v35: '', v36: '', v37: '',
        
        observacionesGenerales: '', // Representa las observaciones de las páginas intermedias
        
        // 6. Manifestación del Interesado (Página 7)
        nombreManifiesta: '',
        manifestacionInteresado: '',

        // 7. Cierre de la Diligencia (Página 8)
        cierreHora: '',
        cierreMinutos: '',
        cierreDia: '',
        cierreMes: '',
        cierreAnio: '',
        numeroHojasActuado: '',
        nombreCopiaRecibida: '',
        
        // 8. Firmas
        nombreAtiendeVisita: '',
        nombreTestigo1: '',
        nombreTestigo2: '',
        nombreVerificador1: '',
        nombreVerificador2: '',
        nombreVerificador3: '',
    });

    // Manejador genérico de cambios para todos los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Definición de las preguntas de la Matriz (basado en las imágenes subidas)
    const verificationMatrix = [
        { section: 'V. CONTROL DE OPERACIONES', id: 'v15', num: 15, text: 'Los equipos de refrigeración mantienen una temperatura máxima de 7 °C (45°F) y los de congelación una temperatura que permite la congelación del producto.' },
        { id: 'v16', num: 16, text: 'Se evita la contaminación cruzada entre la materia prima, producto en elaboración y producto terminado.' },
        { section: 'VI. MATERIAS PRIMAS', id: 'v17', num: 17, text: 'El agua que se utiliza como materia prima es potable.' },
        { id: 'v18', num: 18, text: 'Ausencia de materias primas que puedan representar un riesgo a la salud al utilizarse en la elaboración del producto.' },
        { section: 'VII. ENVASES', id: 'v19', num: 19, text: 'El envase primario es inocuo, se encuentra limpio, en buen estado y de ser el caso desinfectado antes de su uso.' },
        { id: 'v20', num: 20, text: 'Los recipientes y envases vacíos que contuvieron medicamentos, plaguicidas, agentes de limpieza, agentes de desinfección o cualquier sustancia tóxica no son reutilizados.' },
        { section: 'VIII. AGUA EN CONTACTO CON LOS ALIMENTOS', id: 'v21', num: 21, text: 'El agua que está en contacto con superficies y envases es potable.' },
        { id: 'v22', num: 22, text: 'Se practica alguna medida y/o método que garantice la potabilidad del agua.' },
        { section: 'IX. MANTENIMIENTO Y LIMPIEZA', id: 'v23', num: 23, text: 'El equipo y utensilios se encuentran en buenas condiciones de funcionamiento, limpios y desinfectados.' },
        { id: 'v24', num: 24, text: 'Los lubricantes utilizados en equipos o partes que están en contacto directo con materias primas, envase primario, producto en proceso o terminado sin envasar son de grado alimenticio.' },
        { id: 'v25', num: 25, text: 'Los agentes de limpieza y desinfección para equipos y utensilios se utilizan de acuerdo con las instrucciones del fabricante o procedimientos internos garantizando su efectividad.' },
        { section: 'X. CONTROL DE PLAGAS', id: 'v26', num: 26, text: 'Los drenajes cuentan con protección para evitar la entrada de plagas provenientes del alcantarillado o áreas externas.' },
        { id: 'v27', num: 27, text: 'Existen dispositivos en buenas condiciones y localizados adecuadamente para el control de insectos y roedores (cebos, trampas, etc.).' },
        { id: 'v28', num: 28, text: 'En las áreas de proceso no hay evidencia de plagas o fauna nociva.' },
        { section: 'XI. MANEJO DE RESIDUOS', id: 'v29', num: 29, text: 'Los residuos (basura, desechos o desperdicios) generados durante la producción o elaboración son retirados de las áreas cada vez que es necesario o por lo menos una vez al día y se colocan en recipientes identificados y con tapa.' },
        { section: 'XII. SALUD E HIGIENE DEL PERSONAL', id: 'v30', num: 30, text: 'El personal que trabaja en producción o elaboración no presenta signos como: tos frecuente, secreción nasal, diarrea, vómito, fiebre, ictericia o heridas en áreas corporales que entran en contacto directo con las materias primas o productos y se presenta aseado al área de trabajo, con ropa y calzado limpios e íntegros y no existe evidencia de que come, bebe, fuma, masca, escupe, tose y/o estornuda.' },
        { id: 'v31', num: 31, text: 'El personal de las áreas de producción o elaboración, o que se encuentra en contacto directo con materias primas, envases primarios o productos, se lava las manos al inicio de las labores y cada vez que sea necesario de acuerdo con lo siguiente:', isSubSection: true },
        { id: 'v31a', num: 31, sub: 'a', text: 'Se enjuaga las manos con agua y aplica jabón o detergente.' },
        { id: 'v31b', num: 31, sub: 'b', text: 'Se frota vigorosamente la superficie de las manos y entre los dedos; para el lavado de las uñas utiliza cepillo. Cuando utiliza uniforme con mangas cortas se lava hasta la altura de los codos.' },
        { id: 'v31c', num: 31, sub: 'c', text: 'Se enjuaga con agua limpia, cuidando que no queden restos de jabón o detergente. Posteriormente puede utilizarse solución desinfectante.' },
        { id: 'v31d', num: 31, sub: 'd', text: 'Se seca con toallas desechables o dispositivos de secado con aire caliente.' },
        { section: 'XIII. TRANSPORTE', id: 'v32', num: 32, text: 'Los productos son transportados en vehículos que se encuentran limpios, en buen estado de mantenimiento y en condiciones que evitan la contaminación física, química, biológica y por plagas y en su caso, en refrigeración o congelación.' },
        { section: 'XIV. DOCUMENTOS Y REGISTROS', subTitle: '1. CAPACITACIÓN', id: 'v33', num: 33, text: 'El personal que opera en las áreas de producción o elaboración se capacita en buenas prácticas de higiene y manufactura por lo menos una vez al año.' },
        { subTitle: '2. CONTROL DE PLAGAS', id: 'v34', num: 34, text: 'Cuenta con un sistema, programa o plan o certificado para el control y erradicación de plagas, el cual incluye los vehículos propios de acarreo y reparto y quien lo realiza cuenta con Licencia Sanitaria.' },
        { subTitle: '3. CONTROL DE AGUA', id: 'v35', num: 35, text: 'Cuenta con registros diarios del monitoreo de cloro residual libre y periódicos de análisis de organismos coliformes fecales y totales en el agua que entra en contacto directo con materias primas, productos, superficies en contacto con los mismos y envases primarios.' },
        { id: 'v36', num: 36, text: 'El vapor utilizado en superficies que están en contacto directo con materias primas y productos no contiene sustancias que puedan representar un riesgo para la salud o contaminar el producto.' },
        { subTitle: '4. LIMPIEZA Y DESINFECCIÓN', id: 'v37', num: 37, text: 'Cuenta con programas y registros o bitácoras de limpieza y desinfección de las instalaciones, equipos, utensilios y transportes.' },
    ];


    const Header = () => (
        <header className="flex justify-between items-start border-b pb-4 mb-4">
            <div>
                <div className="text-xs text-gray-600">SECRETARÍA DE SALUD</div>
                <div className="text-xl text-blue-900 font-extrabold">Cofepris</div>
                <div className="text-sm text-gray-700 font-semibold">Comisión Federal para la Protección contra Riesgos Sanitarios</div>
            </div>
            <div className="text-right text-sm">
                <div className="font-semibold text-xs">
                    EXP.- <InputField id="expediente" name="expediente" placeholder="EXPEDIENTE" sizeClass="w-24" value={formData.expediente} onChange={handleChange} />
                </div>
                <div className="mt-1">
                    Acta de Verificación Sanitaria No. <InputField id="actaNumero" name="actaNumero" placeholder="NÚMERO DE ACTA" sizeClass="w-32" value={formData.actaNumero} onChange={handleChange} />
                </div>
            </div>
        </header>
    );

    const DependencyTitles = () => (
        <div className="text-center mb-6">
            <h1 className="text-lg font-bold text-gray-800">GOBIERNO DEL ESTADO DE CHIAPAS</h1>
            <h2 className="text-md font-semibold text-gray-700">SECRETARÍA DE SALUD</h2>
            <h3 className="text-sm text-gray-600">DIRECCIÓN DE PROTECCIÓN CONTRA RIESGOS SANITARIOS</h3>
            <h4 className="text-xs text-gray-500">DEPARTAMENTO DE OPERACIÓN SANITARIA</h4>
        </div>
    );

    const MainTitle = () => (
        <div className="text-center mb-8 p-3 bg-blue-100 rounded-lg">
            <strong className="text-base text-blue-800">ACTA DE VERIFICACIÓN SANITARIA DE PRÁCTICAS DE HIGIENE PARA TORTILLERÍAS Y PANADERÍAS</strong>
        </div>
    );
    
    const SectionTitle = ({ title, page = '' }) => (
        <div className="flex justify-between items-center bg-indigo-100 text-indigo-800 p-2 mt-4 mb-2 font-semibold rounded-md">
            <span>{title}</span>
            {page && <span className="text-xs bg-indigo-200 p-1 rounded-full text-indigo-700">{page}</span>}
        </div>
    );

    const OpeningParagraph = () => (
        <div className="text-sm leading-relaxed p-2 border-l-4 border-indigo-400 pl-4 bg-gray-50 rounded-lg">
            <span className="font-bold">En</span> <InputField id="lugarDiligencia" name="lugarDiligencia" placeholder="lugar de la diligencia" sizeClass="w-64" value={formData.lugarDiligencia} onChange={handleChange} />
            siendo las <InputField id="horaInicio" name="horaInicio" placeholder="HH:MM (Inicio Acta)" type="time" sizeClass="w-28" value={formData.horaInicio} onChange={handleChange} /> horas del día
            <InputField id="dia" name="dia" placeholder="Día" sizeClass="w-16" value={formData.dia} onChange={handleChange} /> del mes de <InputField id="mes" name="mes" placeholder="Mes" sizeClass="w-24" value={formData.mes} onChange={handleChange} /> de <InputField id="anio" name="anio" placeholder="Año" sizeClass="w-20" value={formData.anio} onChange={handleChange} />.

            <p className="mt-3 text-xs italic text-gray-600">
                Detalle de los tiempos de la diligencia:
            </p>
            <p className="mt-1 text-sm flex flex-wrap gap-x-6 gap-y-2">
                <span className='font-medium'>Notificación:</span> <InputField id="horaNotificacion" name="horaNotificacion" placeholder="HH:MM" type="time" sizeClass="w-24" value={formData.horaNotificacion} onChange={handleChange} />
                <span className='font-medium'>Inicio de Inspección:</span> <InputField id="horaInspeccion" name="horaInspeccion" placeholder="HH:MM" type="time" sizeClass="w-24" value={formData.horaInspeccion} onChange={handleChange} />
            </p>
            <p className="mt-3 text-sm">
                En cumplimiento a la orden de visita de verificación número <InputField id="ordenVerificacion" name="ordenVerificacion" placeholder="número de orden" sizeClass="w-48" value={formData.ordenVerificacion} onChange={handleChange} />
                de fecha <InputField id="fechaOrden" name="fechaOrden" placeholder="DD/MM/AAAA" type="date" sizeClass="w-32" value={formData.fechaOrden} onChange={handleChange} />, emitida por <InputField id="emisorOrden" name="emisorOrden" placeholder="nombre del emisor" sizeClass="w-64" value={formData.emisorOrden} onChange={handleChange} />
                en su carácter de <InputField id="caracterEmisor" name="caracterEmisor" placeholder="cargo del emisor" sizeClass="w-48" value={formData.caracterEmisor} onChange={handleChange} />, el(los) Verificador(es) <InputField id="verificadores" name="verificadores" placeholder="nombre(s) del verificador(es)" sizeClass="w-80" value={formData.verificadores} onChange={handleChange} />
                adscrito(s) a la <InputField id="adscripcion" name="adscripcion" placeholder="Adscripción" sizeClass="w-64" value={formData.adscripcion} onChange={handleChange} />, quien(es) se identifica(n) con credencial(es)
                número(s) <InputField id="credencialNumero" name="credencialNumero" placeholder="número de credencial" sizeClass="w-48" value={formData.credencialNumero} onChange={handleChange} />, expedida(s) al <InputField id="fechaExpedicion" name="fechaExpedicion" placeholder="DD/MM/AAAA" type="date" sizeClass="w-32" value={formData.fechaExpedicion} onChange={handleChange} /> con fotografía, vigente(s) al <InputField id="vigenciaCredencial" name="vigenciaCredencial" placeholder="DD/MM/AAAA" type="date" sizeClass="w-32" value={formData.vigenciaCredencial} onChange={handleChange} />.
            </p>
        </div>
    );

    const DatosEstablecimiento = () => (
        <>
            <SectionTitle title="DATOS DEL ESTABLECIMIENTO" page="Página 1" />
            <div className="mt-4 text-sm space-y-3 p-2 bg-white border border-gray-200 rounded-lg">
                <p>Constituido(s) en el establecimiento denominado <InputField id="nombreEstablecimiento" name="nombreEstablecimiento" placeholder="Nombre del Establecimiento" sizeClass="w-full" value={formData.nombreEstablecimiento} onChange={handleChange} /></p>
                <p>con giro o actividades de <InputField id="giroActividad" name="giroActividad" placeholder="Giro o Actividad" sizeClass="w-80" value={formData.giroActividad} onChange={handleChange} /> con RFC <InputField id="rfcEstablecimiento" name="rfcEstablecimiento" placeholder="RFC del Establecimiento" sizeClass="w-48" value={formData.rfcEstablecimiento} onChange={handleChange} /></p>
                <p>ubicado en la calle de <InputField id="calle" name="calle" placeholder="Calle" sizeClass="w-96" value={formData.calle} onChange={handleChange} /> número <InputField id="numero" name="numero" placeholder="Número" sizeClass="w-24" value={formData.numero} onChange={handleChange} /> Colonia <InputField id="colonia" name="colonia" placeholder="Colonia" sizeClass="w-64" value={formData.colonia} onChange={handleChange} /></p>
                <p>Delegación o Municipio <InputField id="municipio" name="municipio" placeholder="Delegación o Municipio" sizeClass="w-64" value={formData.municipio} onChange={handleChange} /> Código Postal <InputField id="codigoPostal" name="codigoPostal" placeholder="C.P." sizeClass="w-24" value={formData.codigoPostal} onChange={handleChange} /></p>
                <p>Propietario: <InputField id="propietario" name="propietario" placeholder="Nombre del Propietario" sizeClass="w-full" value={formData.propietario} onChange={handleChange} /></p>
            </div>
            
            <SectionTitle title="PERSONA QUE ATIENDE LA VISITA" page="Página 1" />
            <div className="mt-4 text-sm space-y-3 p-2 bg-white border border-gray-200 rounded-lg">
                <p>dijollamarse <InputField id="nombreOcupante" name="nombreOcupante" placeholder="Nombre del Ocupante" sizeClass="w-full" value={formData.nombreOcupante} onChange={handleChange} /> se identifica con <InputField id="identificacionOcupante" name="identificacionOcupante" placeholder="Identificación" sizeClass="w-48" value={formData.identificacionOcupante} onChange={handleChange} /> con domicilio en <InputField id="domicilioOcupante" name="domicilioOcupante" placeholder="Domicilio" sizeClass="w-full" value={formData.domicilioOcupante} onChange={handleChange} /></p>
                <p>y manifiesta ser el <InputField id="caracterOcupante" name="caracterOcupante" placeholder="Carácter (Encargado, Representante, etc.)" sizeClass="w-80" value={formData.caracterOcupante} onChange={handleChange} /> del establecimiento.</p>
            </div>

            <SectionTitle title="OBJETO Y ALCANCE DE LA ORDEN (Transcribir)" page="Página 2" />
            <div className="mt-4 text-sm p-3 border border-gray-300 rounded-lg bg-gray-50 italic min-h-20">
                <textarea
                    id="objetoAlcance"
                    name="objetoAlcance"
                    placeholder="Transcribir aquí el Objeto y Alcance de la orden de visita sanitaria..."
                    rows="4"
                    className="w-full bg-transparent resize-none focus:outline-none p-1 rounded-md"
                    value={formData.objetoAlcance}
                    onChange={handleChange}
                ></textarea>
            </div>
        </>
    );

    const MatrizVerificacion = () => (
        <div className="py-4 border-t border-gray-200">
            <SectionTitle title="PÁGINAS INTERMEDIAS: MATRIZ DE VERIFICACIÓN SANITARIA" page="Páginas 2 - 6" />
            <div className="bg-white border border-gray-300 rounded-lg shadow-inner mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50 sticky top-0">
                        <tr>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-indigo-700 w-12">No.</th>
                            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-indigo-700">PUNTO DE VERIFICACIÓN (SECCIONES V - XIV)</th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-semibold text-indigo-700 w-48">VALOR</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                        {verificationMatrix.map((item) => (
                            <React.Fragment key={item.id}>
                                {item.section && (
                                    <tr className="bg-indigo-100">
                                        <td colSpan="3" className="px-6 py-2 text-sm font-bold text-indigo-900 border-t border-indigo-300">
                                            {item.section}
                                        </td>
                                    </tr>
                                )}
                                {item.subTitle && (
                                    <tr className="bg-blue-50">
                                        <td colSpan="3" className="px-6 py-1 text-xs font-semibold text-blue-800">
                                            {item.subTitle}
                                        </td>
                                    </tr>
                                )}
                                <tr className={item.isSubSection ? 'bg-gray-50' : ''}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.isSubSection ? `${item.num}.` : item.num}
                                    </td>
                                    <td className="px-6 py-2 text-sm">
                                        {item.sub && <span className="mr-2 text-xs font-mono bg-gray-200 p-0.5 rounded">{item.sub})</span>}
                                        {item.text}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-right">
                                        {/* Solo mostrar selector para puntos verificables */}
                                        {item.id && !item.isSubSection && (
                                            <ComplianceSelector 
                                                id={item.id}
                                                value={formData[item.id]}
                                                onChange={handleChange}
                                            />
                                        )}
                                        {item.id && item.isSubSection && item.sub && (
                                            <ComplianceSelector 
                                                id={item.id}
                                                value={formData[item.id]}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <SectionTitle title="OBSERVACIONES GENERALES Y HECHOS DETALLADOS" page="Páginas 2 - 6" />
            <div className="mt-4 text-sm p-4 border border-gray-300 rounded-lg bg-yellow-50 min-h-40">
                <p className="mb-2 italic text-gray-600 font-semibold">
                    (Este espacio es para describir detalladamente los hechos y observaciones que sustentan los valores de incumplimiento (0) o cumplimiento parcial (1) en la Matriz de Verificación.)
                </p>
                <textarea
                    id="observacionesGenerales"
                    name="observacionesGenerales"
                    placeholder="Escriba aquí el resumen de las observaciones, los hechos encontrados y el sustento técnico-legal, tal como aparece en la hoja que envió..."
                    rows="8"
                    className="w-full bg-white resize-y focus:outline-none p-2 border border-yellow-300 rounded-md shadow-inner text-sm"
                    value={formData.observacionesGenerales}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );

    const ManifestacionInteresado = () => (
        <div className="py-4 border-t border-gray-200">
            <SectionTitle title="DERECHO DE RÉPLICA Y MANIFESTACIONES" page="Página 7" />
            
            <div className="text-sm leading-relaxed mb-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg text-yellow-900">
                <p className="font-bold">DERECHO DE MANIFESTACIÓN:</p>
                <p>Leído lo anterior, se hace saber al interesado el derecho que tiene de manifestar lo que a sus intereses convenga en relación con los hechos contenidos en el acta; o bien, por escrito hacer uso de tal derecho dentro del término de cinco días hábiles a partir del día siguiente de la presente diligencia.</p>
            </div>

            <p className="text-sm leading-relaxed mb-4">
                En uso de la palabra el C. <InputField id="nombreManifiesta" name="nombreManifiesta" placeholder="Nombre completo del que manifiesta" sizeClass="w-80" value={formData.nombreManifiesta} onChange={handleChange} /> hace constar que recibió original de la orden de visita objeto de la presente acta y que identificó plenamente al (los) verificador(es) para tal efecto, y con relación a los hechos que se asientan en la misma manifiesta lo siguiente:
            </p>
            
            <textarea
                id="manifestacionInteresado"
                name="manifestacionInteresado"
                placeholder="Escriba aquí la manifestación del interesado (si la hay)..."
                rows="6"
                className="w-full bg-white resize-y focus:outline-none p-3 border border-indigo-400 rounded-md shadow-inner text-sm"
                value={formData.manifestacionInteresado}
                onChange={handleChange}
            ></textarea>
        </div>
    );

    const FinalizacionDiligencia = () => (
        <div className="py-4 border-t border-gray-400">
            <SectionTitle title="CIERRE DE DILIGENCIA Y FIRMAS" page="Página 8" />

            <div className="text-sm leading-relaxed mb-6 p-2 border border-gray-300 rounded-lg bg-gray-50">
                <p>Previa lectura del acta de verificación ante todos los participantes, visto el contenido de la misma, y sabedores de los delitos en que incurren los falsos declarantes ante la autoridad administrativa, la presente diligencia se cierra siendo las <InputField id="cierreHora" name="cierreHora" placeholder="HH" sizeClass="w-12" type="number" value={formData.cierreHora} onChange={handleChange} /> horas con <InputField id="cierreMinutos" name="cierreMinutos" placeholder="MM" sizeClass="w-16" type="number" value={formData.cierreMinutos} onChange={handleChange} /> minutos del día <InputField id="cierreDia" name="cierreDia" placeholder="Día" sizeClass="w-16" value={formData.cierreDia} onChange={handleChange} />, mes <InputField id="cierreMes" name="cierreMes" placeholder="Mes" sizeClass="w-24" value={formData.cierreMes} onChange={handleChange} /> de <InputField id="cierreAnio" name="cierreAnio" placeholder="Año" sizeClass="w-20" value={formData.cierreAnio} onChange={handleChange} />, firmando los que en ella participan para todos los efectos legales a que haya lugar, dejándose copia de todo lo actuado consistente en <InputField id="numeroHojasActuado" name="numeroHojasActuado" placeholder="número" type="number" sizeClass="w-16" value={formData.numeroHojasActuado} onChange={handleChange} /> hojas en poder del C. <InputField id="nombreCopiaRecibida" name="nombreCopiaRecibida" placeholder="Nombre de quien recibe la copia" sizeClass="w-full" value={formData.nombreCopiaRecibida} onChange={handleChange} />.</p>
            </div>
            
            {/* Sección de Firmas */}
            <div className="grid grid-cols-3 gap-8 text-center text-sm font-medium pt-4">
                <div className="space-y-4">
                    <InputField id="nombreAtiendeVisita" name="nombreAtiendeVisita" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreAtiendeVisita} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">ATIENDE LA VISITA</div>
                </div>
                <div className="space-y-4">
                    <InputField id="nombreTestigo1" name="nombreTestigo1" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreTestigo1} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">TESTIGO</div>
                </div>
                <div className="space-y-4">
                    <InputField id="nombreTestigo2" name="nombreTestigo2" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreTestigo2} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">TESTIGO</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center text-sm font-medium mt-8">
                <div className="space-y-4">
                    <InputField id="nombreVerificador1" name="nombreVerificador1" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreVerificador1} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">VERIFICADOR SANITARIO</div>
                </div>
                <div className="space-y-4">
                    <InputField id="nombreVerificador2" name="nombreVerificador2" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreVerificador2} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">VERIFICADOR SANITARIO</div>
                </div>
                <div className="space-y-4">
                    <InputField id="nombreVerificador3" name="nombreVerificador3" placeholder="Nombre y firma" sizeClass="w-full" value={formData.nombreVerificador3} onChange={handleChange} />
                    <div className="border-t border-gray-600 pt-1">VERIFICADOR SANITARIO</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="acta-container max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-2xl">
                <Header />
                <DependencyTitles />
                <MainTitle />

                {/* --- SECCIONES PRINCIPALES DEL ACTA --- */}
                <OpeningParagraph />
                <DatosEstablecimiento />
                {/* MATRIZ DE VERIFICACIÓN AÑADIDA */}
                <MatrizVerificacion /> 
                <ManifestacionInteresado />
                <FinalizacionDiligencia />
                
                {/* --- Pie de página y Control --- */}
                <footer className="mt-12 pt-4 border-t text-xs text-center text-gray-500">
                    <p>COS-DESVS-P-01-M-01-AC-42. Acta de verificación sanitaria de prácticas de higiene para tortillerías y panaderías</p>
                    <p>Documento Simulado</p>
                    <p className="mt-2 text-gray-400">Estado de la Plantilla: {Object.values(formData).filter(v => v && !v.startsWith('v')).length} campos únicos llenos de {Object.keys(formData).length} campos totales</p>
                </footer>
            </div>
        </div>
    );
};

export default App;