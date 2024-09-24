import Swal from "sweetalert2";
import { get_filter_words, set_filter_words } from "./utils.js";

export function create_ui() {
	create_main_ui();
}

export function create_topic_ui() {
	const nav = document.querySelector('[aria-label="Explore navigation"]');
	const div = nav.querySelector("div");
	const num_a = document.createElement("a");
	num_a.classList =
		"js-selected-navigation-item d-inline-block py-2 py-md-3 mr-3 mr-md-4 no-underline subnav-link";
	num_a.id = "hly_num";
	num_a.textContent = "过滤 0 个仓库";
	div.appendChild(num_a);
	const setting_a = document.createElement("a");
	setting_a.classList =
		"js-selected-navigation-item d-inline-block py-2 py-md-3 mr-3 mr-md-4 no-underline subnav-link";
	setting_a.id = "hly_setting";
	setting_a.textContent = "过滤设置";
	setting_a.onclick = create_settings_ui;
	div.appendChild(setting_a);
}

function create_settings_ui() {
	Swal.fire({
		title: "设置",
		html: `
            <div>
                <div>
                    <label>关键字过滤</label>
                </div>
                <textarea style="width: 80%" id="textarea1" class="swal2-textarea" placeholder=""></textarea>
                <div>
                    <label>作者过滤</label>
                </div>
                <textarea style="width: 80%" id="textarea2" class="swal2-textarea" placeholder=""></textarea>
                <div>
                    <label>仓库过滤</label>
                </div>
                <textarea style="width: 80%" id="textarea3" class="swal2-textarea" placeholder=""></textarea>
                <div>
                    <span style="font-size: 12px;">关键字用英文逗号分隔开。</span>
                </div>
            </div>
        `,
		focusConfirm: false,
		didOpen: () => {
			const doc = document;
			doc.getElementById("textarea1").value = get_filter_words("KeyWords");
			doc.getElementById("textarea2").value = get_filter_words("RepoWords");
			doc.getElementById("textarea3").value = get_filter_words("AuthorWords");
		},
		preConfirm: () => {
			return [
				document.getElementById("textarea1").value,
				document.getElementById("textarea2").value,
				document.getElementById("textarea3").value,
			];
		},
		showCancelButton: true,
	}).then((result) => {
		if (result.isConfirmed) {
			set_filter_words("KeyWords", result.value[0]);
			set_filter_words("RepoWords", result.value[1]);
			set_filter_words("AuthorWords", result.value[2]);
		}
	});
}
