import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<iron-iconset-svg name="aqa-data-icon" size="16">
    <svg>
        <defs>
            <g id="calendar">
                <path d="M14 1v3h-3v-3h-6v3h-3v-3h-2v15h16v-15h-2zM3 15h-2v-2h2v2zM3 12h-2v-2h2v2zM3 9h-2v-2h2v2zM6 15h-2v-2h2v2zM6 12h-2v-2h2v2zM6 9h-2v-2h2v2zM9 15h-2v-2h2v2zM9 12h-2v-2h2v2zM9 9h-2v-2h2v2zM12 15h-2v-2h2v2zM12 12h-2v-2h2v2zM12 9h-2v-2h2v2zM15 15h-2v-2h2v2zM15 12h-2v-2h2v2zM15 9h-2v-2h2v2z"></path>
                <path d="M3 0h1v3h-1v-3z"></path>
                <path d="M12 0h1v3h-1v-3z"></path>
            </g>


        </defs>

    </svg>
</iron-iconset-svg><iron-iconset-svg name="inline" size="24">
    <svg>
        <defs>
            <g id="shape">
                <rect x="12" y="0" width="12" height="24"></rect>
                <circle cx="12" cy="12" r="12"></circle>
            </g>
        </defs>
    </svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
