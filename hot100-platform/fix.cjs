const fs = require('fs');
const files = [
    '035_search_insert.html',
    '074_search_matrix.html',
    '105_preorder_inorder.html',
    '437_path_sum_iii.html'
];
files.forEach(f => {
    let p = `d:/projects/personal_projects/algorithm_visualization/hot100-platform/public/problems/${f}`;
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
    fs.writeFileSync(p, c);
    console.log('Fixed ' + f);
});
