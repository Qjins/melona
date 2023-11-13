document.addEventListener('DOMContentLoaded', function() {
    // URL에서 stationCode 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const stationCode = urlParams.get('stationCode');

    // 역 상세 정보 가져오기
    if (stationCode) {
        fetchStationDetail(stationCode);
    } else {
        console.error('No station code provided in URL');
    }
});



function fetchStationDetail(stationCode) {
    fetch('stations_info.json')
        .then(response => response.json())
        .then(data => {
            const stationData = data.DATA;
            const currentStationIndex = stationData.findIndex(station => station.fr_code === stationCode);
            
            if (currentStationIndex !== -1) {
                // 현재 역 정보 업데이트
                updateStationInfo('current-station', stationData[currentStationIndex].station_nm);

                // 이전 역 정보 업데이트
                if (currentStationIndex > 0) {
                    updateStationInfo('prev-station', stationData[currentStationIndex - 1].station_nm);
                }

                // 다음 역 정보 업데이트
                if (currentStationIndex < stationData.length - 1) {
                    updateStationInfo('next-station', stationData[currentStationIndex + 1].station_nm);
                }
            } else {
                console.error('Station code not found in data');
            }
        })
        .catch(error => {
            console.error('Error fetching station detail:', error);
        });
}

function updateStationInfo(className, stationName) {
    // 클래스 이름에 따라 역 이름 업데이트
    const stationElements = document.getElementsByClassName(className);
    for (let element of stationElements) {
        element.querySelector('.station-name').textContent = stationName;
    }

    // 현재 역이면 헤더에도 역 이름 업데이트
    if (className === 'current-station') {
        document.getElementById('station-name').textContent = stationName;
    }
}

// 호선 번호를 결정하는 함수
function getLineFromFRCode(frCode) {
    if (frCode.startsWith('P') && frCode[1] === '1') {
        return '1';
    }
    return frCode[0];
}

// 현재 역의 CSS 클래스 설정 함수
function setCurrentStationClass(stationCode) {
    const lineNum = getLineFromFRCode(stationCode);
    const currentStationElement = document.querySelector('.station-detail-container .current-station');
    currentStationElement.classList.add('line' + lineNum);
}

// 전체 역 목록을 fr_code를 기준으로 정렬하는 함수
function sortStationsByFRCode(stations) {
    return stations.sort((a, b) => a.fr_code.localeCompare(b.fr_code, undefined, { numeric: true, sensitivity: 'base' }));
}

// 이전과 다음 역의 정보를 얻는 함수 (호선 고려)
function getAdjacentStations(stationCode, allStations, currentLine) {
    // 현재 호선에 있는 역만 필터링 및 정렬
    const lineStations = sortStationsByFRCode(allStations.filter(station => station.line_num === currentLine));
    const currentIndex = lineStations.findIndex(station => station.fr_code === stationCode);
    const prevStation = currentIndex > 0 ? lineStations[currentIndex - 1] : null;
    const nextStation = currentIndex < lineStations.length - 1 ? lineStations[currentIndex + 1] : null;
    return { prevStation, nextStation };
}

// 이전과 다음 역 버튼에 이벤트 리스너 추가
function setupStationNavigation(stationCode, allStations, currentLine) {
    const { prevStation, nextStation } = getAdjacentStations(stationCode, allStations, currentLine);

    // 이전 역 버튼 설정
    const prevStationButton = document.querySelector('.prev-station .station-button');
    if (prevStation) {
        prevStationButton.addEventListener('click', () => {
            window.location.href = `station-detail.html?stationCode=${encodeURIComponent(prevStation.fr_code)}`;
        });
        updateStationInfo('prev-station', prevStation.station_nm);
    } else {
        prevStationButton.style.display = 'none';
    }

    // 다음 역 버튼 설정
    const nextStationButton = document.querySelector('.next-station .station-button');
    if (nextStation) {
        nextStationButton.addEventListener('click', () => {
            window.location.href = `station-detail.html?stationCode=${encodeURIComponent(nextStation.fr_code)}`;
        });
        updateStationInfo('next-station', nextStation.station_nm);
    } else {
        nextStationButton.style.display = 'none';
    }
}



// 역 정보 업데이트 함수
function updateStationInfo(className, stationName) {
    const stationElements = document.getElementsByClassName(className);
    for (let element of stationElements) {
        element.querySelector('.station-name').textContent = stationName;
    }

    if (className === 'current-station') {
        document.getElementById('station-name').textContent = stationName;
    }
}

// DOM 로딩 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const stationCode = urlParams.get('stationCode');

    // 전체 역 정보 가져오기
    fetch('stations_info.json')
        .then(response => response.json())
        .then(data => {
            if (stationCode) {
                const currentStation = data.DATA.find(station => station.fr_code === stationCode);
                if (currentStation) {
                    setCurrentStationClass(stationCode); // 현재 역의 CSS 클래스 설정
                    setupStationNavigation(stationCode, data.DATA, currentStation.line_num); // 네비게이션 설정
                } else {
                    console.error('Station not found');
                }
            } else {
                console.error('No station code provided in URL');
            }
        })
        .catch(error => console.error('Error fetching station data:', error));
});