import rawCSV from '/datos-reales-dos.csv?raw';

// Parser manual robusto de CSV para manejar comillas y saltos de línea internos
const parseCSV = (text) => {
    let ret = [''], i = 0, s = true;
    for (let l = text; i < l.length; i++) {
        let l_i = l[i];
        if (l_i === '"') {
            s = !s;
            if (l[i+1] === '"') {
                ret[ret.length - 1] += '"';
                i++;
            }
        } else if (l_i === ';' && s) l_i = '|';
        
        if (l_i === '\n' && s) {
            ret.push('');
        } else if (l_i === '\r' && s) {
            // skip 
        } else {
            ret[ret.length - 1] += l_i;
        }
    }
    return ret.map(row => {
        return row.split('|').map(val => val.trim());
    }).filter(row => row.length > 1);
};

export const generateFullData = () => {
    try {
        if (!rawCSV) return [];
        
        // 1. Parsear el CSV crudo
        const rows = parseCSV(rawCSV);
        const tickets = [];

    // 2. Mapear respetando los índices exactos de datos-reales-dos.csv
    for(let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r[0]) continue; // ignorar basuras
        
        tickets.push({
            id: r[0],
            estado: r[1],
            tipo: r[2],
            asunto: `Radicado #${r[0]} - ${r[15] || 'Colegio Calasanz'}`,
            dependencia: r[3],
            solicitante: r[7] || 'Usuario Anónimo',
            creadoPor: r[12] || 'Sistema SGC',
            fecha: r[13] ? r[13].split(' ')[0] : '--',
            descripcion: r[5] || 'Sin detalles proporcionados.',
            respuesta: r[8] || '', // Columna 8: Descripcion de la solicitud
            email: r[11] || '',
            fechaRespuesta: r[10] ? r[10].split(' ')[0] : '--'
        });
    }

        // 3. Ordenarlos por ID descendente (opcional, para ver más recientes arriba)
        return tickets.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } catch (error) {
        console.error("Error al parsear el CSV de la base de datos:", error);
        return [];
    }
};
