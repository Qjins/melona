// stations.js


function loadStations() {
    const timeline = document.getElementById('line-timeline');
    const line = timeline.getAttribute('data-line');
    const lineClass = 'line' + line.substring(0, 2);
  
    // 데이터 로드 전에 적절한 클래스를 timeline에 추가
    timeline.classList.add(lineClass);
  
    // Fetch the station data
    fetch('stations_info.json')
      .then(response => response.json())
      .then(data => {
        // 현재 호선의 데이터만 필터링
        const lineData = data.DATA.filter(station => station.line_num === line);
        // 'fr_code'를 기준으로 오름차순으로 정렬
        lineData.sort((a, b) => a.fr_code.localeCompare(b.fr_code));
        lineData.forEach(station => {
          const stationElement = document.createElement('div');
          stationElement.className = 'station';
          stationElement.innerHTML = `
            <div class="station-node in">
              <i class="fas fa-angle-down"></i>
            </div>
            <div class="station-node out">
              <i class="fas fa-angle-up"></i>
            </div>
            <span class="station-name">${station.station_nm}</span>
          `;
  
          // 클릭 이벤트 리스너 추가
          stationElement.addEventListener('click', function() {
            window.location.href = `station-detail.html?stationCode=${encodeURIComponent(station.fr_code)}`;
          });
          timeline.appendChild(stationElement);
        });
      })
      .catch(error => console.error('Error loading station data:', error));
  }
  
  document.addEventListener('DOMContentLoaded', loadStations);
  