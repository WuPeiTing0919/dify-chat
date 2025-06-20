import { DifyApi } from "@/services/dify";
import { DEFAULT_APP_SITE_SETTING } from "@dify-chat/core";
import { useRequest } from "ahooks";
import { useMemo } from "react";

/**
 * 获取 Dify 应用 API 实例
 */
export const useDifyApi = (options: { user: string; appId: string }) => {
	const difyApi = useMemo(() => {
		return new DifyApi(options);
	}, [options.user, options.appId]);

	return difyApi;
};

/**
 * 获取应用的 WebApp 设置
 */
export const useAppSiteSetting = () => {
	const { runAsync: getAppSiteSettting } = useRequest(
		(difyApi: DifyApi) => {
			return difyApi
				.getAppSiteSetting()
				.then((res) => {
					return res;
				})
				.catch((err) => {
					console.error(err);
                                        console.warn(
                                                "Dify 版本提示: 獲取應用 WebApp 設置失敗，已降級為使用默認設置。如需與 Dify 配置同步，請確保你的 Dify 版本 >= v1.4.0",
                                        );
					return DEFAULT_APP_SITE_SETTING;
				});
		},
		{
			manual: true,
		},
	);

	return {
		getAppSiteSettting,
	};
};
