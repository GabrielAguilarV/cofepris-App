interface RegistroCofepris {
  id: number
  titulo: string
  Opciones: RegistroOpciones[]
}

interface RegistroOpciones {
  id: number
  descripcion: string
  subtitulo?: string
}

export const REGISTRO_COFEPRIS: RegistroCofepris[] = [
  {
    id: 1,
    titulo: 'INSTALACIONES Y AREAS',
    Opciones: [
      {
        id: 1,
        descripcion:
          '. Las instalaciones del establecimiento, incluidos techos, puertas, paredes, pisos, baños, cisternas, tinacos u otros depósitos de agua, y mobiliario se encuentran en buenas condiciones de mantenimiento y limpios. '
      },
      {
        id: 2,
        descripcion:
          ' Las puertas y ventanas de las áreas de producción o elaboración están-provistas de protección para evitar la entrada de luvia y fauna nociva.'
      }
    ]
  },
  {
    id: 2,
    titulo: 'EQUIPO Y UTENSILIOS',
    Opciones: [
        {
        id: 3,
        descripcion: 'El equipo, utensilios y materiales que se emplean en la produccion o elaboracion, son inocuos y son resistentes a la corrosion y entan instalados en forma taal que el espacio entre estos, la pated, el techo y el piso permiten su limpieza y desisfeccion.'
        },
        {
        id: 4,
        descripcion: 'Los equipos de refrigeración ylo congelación están provistos de termómetros o dispositivos para el registro de temperatura funcionando correctamente y en un lugar accesible para su monitoreo y no presentan acumulación de agua.'
        }
    ]
  },
  {
    id: 3,
    titulo: 'SERVICIOS',
    Opciones: [
      {
        id: 5,
        descripcion: 'Cuenta con abastecimiento de agua potable e instalaciones apropiadas para su almacenamiento y distribución.'
      },
      {
        id: 6,
        descripcion: 'El agua no potable que se utiliza para servicios y otros propósitos, se transporta por tuberías completamente separadas e identificadas de las tuberías que conducen agua potable.'
      },
      {
        id: 7,
        descripcion: 'El drenaje cuenta con trampa contra olores, coladeras y/o canaletas con rejillas, libres de basura, sin estancamiento y en buen estado; y en su caso trampas para grasa.'
      },
      {
        id: 8,
        descripcion: 'Los sanitarios cuentan con separación física completa y no tienen comunicación ni ventilación directa hacia el área de producción o elaboración y están provistos con agua potable, retretes, lavabos, papel higiénico, jabón o detergente, toallas desechables o secador de aire de accionamiento automático y recipiente para basura con bolsa y tapa oscilante o accionada por pedal y cuentan con rótulos o ilustraciones que promuevan la higiene personal y el lavado de manos después de utilizar los sanitarios.'
      },
      {
        id: 9,
        descripcion: 'La ventilación evita el calor, condensación de vapor, acumulación de humo y polvo.'
      },
      {
        id: 10,
        descripcion: 'La iluminación permite llevar a cabo la realización de las operaciones de manera higiénica y en las áreas donde los productos se encuentren sin envasar, los focos y lámparas están protegidos o son de material que impide su astillamiento.'
      }
    ]
  },
  {
    id: 4,
    titulo: 'ALMACENAMIENTO',
    Opciones: [
      {
        id: 11,
        descripcion: 'Los agentes de limpieza, químicos y sustancias tóxicas, se encuentran almacenados en un área específica, separada y delimitada de las áreas de almacenamiento y manipulación de materia prima y/o producto.'
      },
      {
        id: 12,
        descripcion: 'Las materias primas y/o productos se colocan en mesas, estibas, tarimas, anaqueles, entrepaños, estructura o cualquier superficie limpia y en condiciones que evite su contaminación.'
      },
      {
        id: 13,
        descripcion: 'Las materias primas y productos están rotulados de tal manera que permita identificar su naturaleza y aplicar un sistema de Primeras Entradas Primeras Salidas.'
      },
      {
        id: 14,
        descripcion: 'Los envases y recipientes en contacto directo con la materia prima y productos se almacenan protegidos de polvo, lluvia, fauna nociva y materia extraña.'
      }
    ]
  },
    {
      id: 5,
      titulo: 'CONTROL DE OPERACIONES',
      Opciones: [
        {
          id: 15,
          descripcion: 'Los equipos de refrigeración mantienen una temperatura máxima de 7 °C (45°F) y los de congelación una temperatura que permite la congelación del producto.'
        },
        {
          id: 16,
          descripcion: 'Se evita la contaminación cruzada entre la materia prima, producto en elaboración y producto terminado.'
        }
      ]
    },
    {
      id: 6,
      titulo: 'MATERIAS PRIMAS',
      Opciones: [
        {
          id: 17,
          descripcion: 'El agua que se utiliza como materia prima es potable.'
        },
        {
          id: 18,
          descripcion: 'Ausencia de materias primas que puedan representar un riesgo a la salud al utilizarse en la elaboración del producto.'
        }
      ]
    },
    {
      id: 7,
      titulo: 'ENVASES',
      Opciones: [
        {
          id: 19,
          descripcion: 'El envase primario es inocuo, se encuentra limpio, en buen estado y de ser el caso desinfectado antes de su uso.'
        },
        {
          id: 20,
          descripcion: 'Los recipientes y envases vacíos que contuvieron medicamentos, plaguicidas, agentes de limpieza, agentes de desinfección o cualquier sustancia tóxica no son reutilizados.'
        }
      ]
    },
    {
      id: 8,
      titulo: 'AGUA EN CONTACTO CON LOS ALIMENTOS',
      Opciones: [
        {
          id: 21,
          descripcion: 'El agua que está en contacto con superficies y envases es potable.'
        },
        {
          id: 22,
          descripcion: 'Se practica alguna medida y/o método que garantice la potabilidad del agua.'
        }
      ]
    },
    {
      id: 9,
      titulo: 'MANTENIMIENTO Y LIMPIEZA',
      Opciones: [
        {
          id: 23,
          descripcion: 'El equipo y utensilios se encuentran en buenas condiciones de funcionamiento, limpios y desinfectados.'
        },
        {
          id: 24,
          descripcion: 'Los lubricantes utilizados en equipos o partes que están en contacto directo con materias primas, envase primario, producto en proceso o terminado sin envasar son de grado alimenticio.'
        },
        {
          id: 25,
          descripcion: 'Los agentes de limpieza y desinfección para equipos y utensilios se utilizan de acuerdo con las instrucciones del fabricante o procedimientos internos garantizando su efectividad.'
        }
      ]
    },
    {
      id: 10,
      titulo: 'CONTROL DE PLAGAS',
      Opciones: [
        {
          id: 26,
          descripcion: 'Los drenajes cuentan con protección para evitar la entrada de plagas provenientes del alcantarillado o áreas externas.'
        },
        {
          id: 27,
          descripcion: 'Existen dispositivos en buenas condiciones y localizados adecuadamente para el control de insectos y roedores (cebos, trampas, etc.).'
        },
        {
          id: 28,
          descripcion: 'En las áreas de proceso no hay evidencia de plagas o fauna nociva.'
        }
      ]
    },
    {
      id: 11,
      titulo: 'MANEJO DE RESIDUOS',
      Opciones: [
        {
          id: 29,
          descripcion: 'Los residuos (basura, desechos o desperdicios) generados durante la producción o elaboración son retirados de las áreas cada vez que es necesario o por lo menos una vez al día y se colocan en recipientes identificados y con tapa.'
        }
      ]
    },
    {
      id: 12,
      titulo: 'SALUD E HIGIENE DEL PERSONAL',
      Opciones: [
        {
          id: 30,
          descripcion: 'El personal que trabaja en producción o elaboración no presenta signos como: tos frecuente, secreción nasal, diarrea, vómito, fiebre, ictericia o heridas en áreas corporales que entran en contacto directo con las materias primas o productos y se presenta aseado al área de trabajo, con ropa y calzado limpios e íntegros y no existe evidencia de que come, bebe, fuma, masca, escupe, tose y/o estornuda.'
        },
        {
          id: 31,
          descripcion: 'El personal de las áreas de producción o elaboración, o que se encuentra en contacto directo con materias primas, envases primarios o productos, se lava las manos al inicio de las labores y cada vez que sea necesario de acuerdo con lo siguiente:\n a) Se enjuaga las manos con agua y aplica jabón o detergente.\n b) Se frota vigorosamente la superficie de las manos y entre los dedos; para el lavado de las uñas utiliza cepillo. Cuando utiliza uniforme con mangas cortas se lava hasta la altura de los codos.\n c) Se enjuaga con agua limpia, cuidando que no queden restos de jabón o detergente. Posteriormente puede utilizarse solución desinfectante.\n d) Se seca con toallas desechables o dispositivos de secado con aire caliente.'
        }
      ]
    },
    {
      id: 13,
      titulo: 'TRANSPORTE',
      Opciones: [
        {
          id: 32,
          descripcion: 'Los productos son transportados en vehículos que se encuentran limpios, en buen estado de mantenimiento y en condiciones que evitan la contaminación física, química, biológica y por plagas y en su caso, en refrigeración o congelación.'
        }
      ]
    }
    ,
    {
      id: 14,
      titulo: 'DOCUMENTOS Y REGISTROS',
      Opciones: [
        {
          id: 33,
          descripcion: 'El personal que opera en las áreas de producción o elaboración se capacita en buenas prácticas de higiene y manufactura por lo menos una vez al año.',
          subtitulo: 'CAPACITACIÓN'
        },
        {
          id: 34,
          descripcion: 'Cuenta con un sistema, programa o plan o certificado para el control y erradicación de plagas, el cual incluye los vehículos propios de acarreo y reparto y quien lo realiza cuenta con Licencia Sanitaria.',
          subtitulo: 'CONTROL DE PLAGAS'
        },
        {
          id: 35,
          descripcion: 'Cuenta con registros diarios del monitoreo de cloro residual libre y periódicos de análisis de organismos coliformes fecales y totales en el agua que entra en contacto directo con materias primas, productos, superficies en contacto con los mismos y envases primarios.',
          subtitulo: 'CONTROL DE AGUA'
        },
        {
          id: 36,
          descripcion: 'El vapor utilizado en superficies que están en contacto directo con materias primas y productos no contiene sustancias que puedan representar un riesgo para la salud o contaminar el producto.',
          subtitulo: 'CONTROL DE AGUA'
        },
        {
          id: 37,
          descripcion: 'Cuenta con programas y registros o bitácoras de limpieza y desinfección de las instalaciones, equipos, utensilios y transportes.',
          subtitulo: 'LIMPIEZA Y DESINFECCIÓN'
        }
      ]
    }
]
