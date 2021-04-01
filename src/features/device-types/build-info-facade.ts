import * as memoizee from 'memoizee';

import * as deviceTypesLib from '@resin.io/device-types';

import { FILES_HOST } from '../../lib/config';
import { fileExists, getFile, getFolderSize, getImageKey } from './storage';

export type DeviceType = deviceTypesLib.DeviceType;

const BUILD_PROPERTY_CACHE_EXPIRATION = 10 * 60 * 1000; // 10 mins
const BUILD_COMPRESSED_SIZE_CACHE_EXPIRATION = 20 * 60 * 1000; // 20 mins

export const getLogoUrl = memoizee(
	async (
		normalizedSlug: string,
		buildId: string,
	): Promise<string | undefined> => {
		if (!FILES_HOST) {
			return;
		}
		const pathComponents = [normalizedSlug, buildId, 'logo.svg'];
		try {
			const logoKey = getImageKey(...pathComponents);
			const hasLogo = await fileExists(logoKey);
			if (!hasLogo) {
				return;
			}

			// url encode since the buildId can contain a `+`
			const encodedLogoPath = getImageKey(
				...pathComponents.map(encodeURIComponent),
			);
			return `https://${FILES_HOST}/${encodedLogoPath}`;
		} catch {
			return;
		}
	},
	{
		promise: true,
		primitive: true,
		preFetch: true,
		maxAge: BUILD_PROPERTY_CACHE_EXPIRATION,
	},
);

export const getDeviceTypeJson = memoizee(
	async (
		normalizedSlug: string,
		buildId: string,
	): Promise<deviceTypesLib.DeviceType | undefined> => {
		const isIgnored = await fileExists(
			getImageKey(normalizedSlug, buildId, 'IGNORE'),
		);
		if (isIgnored) {
			return undefined;
		}
		const response = await getFile(
			getImageKey(normalizedSlug, buildId, 'device-type.json'),
		);
		const deviceType =
			response && response.Body
				? (JSON.parse(response.Body.toString()) as DeviceType)
				: undefined;
		if (deviceType) {
			deviceType.buildId = buildId;
		}
		return deviceType;
	},
	{
		promise: true,
		primitive: true,
		preFetch: true,
		maxAge: BUILD_PROPERTY_CACHE_EXPIRATION,
	},
);

export const getCompressedSize = memoizee(
	async (normalizedSlug: string, buildId: string): Promise<number> => {
		return await getFolderSize(
			getImageKey(normalizedSlug, buildId, 'compressed'),
		);
	},
	{
		promise: true,
		primitive: true,
		preFetch: true,
		maxAge: BUILD_COMPRESSED_SIZE_CACHE_EXPIRATION,
	},
);
