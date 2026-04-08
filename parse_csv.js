const fs = require('fs');

const content = fs.readFileSync('C:\\Sistema_gestion_pqrsf\\datos-reales-dos.csv', 'utf8');

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

const rows = parseCSV(content);

let tickets = [];
for(let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[0]) continue;
    tickets.push({
        id: r[0],
        estado: r[1],
        tipo: r[2],
        asunto: `Radicado #${r[0]} - ${r[15] || 'Reciente'}`,
        dependencia: r[3],
        solicitante: r[7] || 'Usuario Anónimo',
        creadoPor: r[12] || 'Sistema SGC',
        fecha: r[13] ? r[13].split(' ')[0] : '--',
        descripcion: r[5] || 'Sin detalles.',
        respuesta: r[8] || '',
        email: r[11] || '',
        fechaRespuesta: r[10] ? r[10].split(' ')[0] : '--'
    });
}

const finalJs = `// Datos inyectados directamente desde CSV oficial
export const generateFullData = () => {
    return ${JSON.stringify(tickets, null, 4)};
};
`;

fs.writeFileSync('C:\\Sistema_gestion_pqrsf\\src\\modules\\pqrsf\\services\\mockData.js', finalJs);
console.log('Migración completa: ' + tickets.length + ' tickets exportados exitosamente a mockData.js.');
