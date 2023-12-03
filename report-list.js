window.onload = function() {
    const reportListContainer = document.getElementById('report-list');
    
// 샘플 리포트 데이터
const sampleReports = [
    { title: '샘플 리포트 1', content: '이것은 첫 번째 샘플 리포트입니다.' },
    { title: '샘플 리포트 2', content: '이것은 두 번째 샘플 리포트입니다.' },
    { title: '샘플 리포트 3', content: '이것은 세 번째 샘플 리포트입니다.' }
];

// localStorage에서 리포트 불러오기, 없으면 샘플 데이터 사용
const reports = JSON.parse(localStorage.getItem('reports')) || sampleReports;


    reports.forEach(report => {
        const reportDiv = document.createElement('a');
        reportDiv.className = 'list-group-item list-group-item-action';
        reportDiv.setAttribute('href', '#');
        reportDiv.innerHTML = `
            <h3>${report.title}</h3>
            <p>${report.content}</p>
        `;
        reportListContainer.appendChild(reportDiv);
    });
};

function submitReport() {
    const title = document.getElementById('report-title').value;
    const content = document.getElementById('report-content').value;

    const newReport = { title, content };
    
// 샘플 리포트 데이터
const sampleReports = [
    { title: '샘플 리포트 1', content: '이것은 첫 번째 샘플 리포트입니다.' },
    { title: '샘플 리포트 2', content: '이것은 두 번째 샘플 리포트입니다.' },
    { title: '샘플 리포트 3', content: '이것은 세 번째 샘플 리포트입니다.' }
];

// localStorage에서 리포트 불러오기, 없으면 샘플 데이터 사용
const reports = JSON.parse(localStorage.getItem('reports')) || sampleReports;

    reports.push(newReport);

    localStorage.setItem('reports', JSON.stringify(reports));

    window.location.href = 'report-list.html'; // 리포트 목록 페이지로 이동
}
