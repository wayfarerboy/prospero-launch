const options = [
  { id: 'background', key: 'b' },
  { id: 'crop', key: 'c' },
  { id: 'gravity', key: 'g' },
  { id: 'height', key: 'h' },
  { id: 'width', key: 'w' },
];

const basename = 'https://res.cloudinary.com';
const lores = 24;
const resolutions = [160, 320, 640, 960, 1280, 1440, 1920];

const formats = {
  image: ['jpg', 'png'],
  video: ['mp4', 'mov', 'avi', 'm4v', 'mkv'],
};

const resourceTypes = {
  'image': { icon: 'image' },
  'video': { icon: 'live_tv' },
  'raw': { icon: 'insert_drive_file' },
};

const getHeight = (media, opts, width) => {
  if (!media.height || !opts.height) return null;
  return Math.round((width / (opts.width || media.width)) * (opts.height || media.height));
};

const url = (id, opts) => {
  const optString = options
    .filter(o => opts[o.id])
    .map(o => `${o.key}_${opts[o.id]}`)
    .join(',');
  return `${basename}/${opts.cloudName}/${optString}/${id}${opts.format ? '.'+opts.format : ''}`;
};

const getSrc = (media, opts, maxWidth = resolutions[resolutions.length - 1]) => {
  if (!opts.cloudName) throw new Error('cloudName required');
  if (opts.crop) {
    opts.crop = 'thumb';
    opts.gravity = 'custom';
  }
  if (media.resourceType === 'video') {
    opts.cloudName += '/video/upload';
    opts.format = opts.format || 'jpg';
  } else if (media.resourceType === 'url') {
    opts.cloudName += '/image/url2png';
    opts.format = null;
  }
  const src = url(media.publicId, { ...opts, width: lores, height: getHeight(media, opts, lores) });
  const _resolutions = [...resolutions];
  const max = Math.min(media.width, maxWidth, (opts.width && opts.width * 2) || maxWidth);
  if (resolutions.indexOf(media.width) === -1) {
    _resolutions.push(media.width);
  }
  if (resolutions.indexOf(opts.width) === -1) {
    _resolutions.push(opts.width);
    _resolutions.push(opts.width * 2);
  }
  _resolutions.sort((a, b) => a - b);
  const srcSet = _resolutions
    .filter(r => r <= max)
    .map(((_r) => {
      const r = Math.ceil(_r);
      return `${url(media.publicId, {
        ...opts,
        width: r,
        height: getHeight(media, opts, r),
      })} ${r}w`;
    }))
    .join(', ');
  return { src, srcSet };
};

const getVideoSrc = (media, opts) => {
  if (!opts.cloudName) throw new Error('cloudName required');
  if (media.resourceType !== 'video') throw new Error('Not a video', media);
  const src = `${basename}/${opts.cloudName}/video/upload/sp_hd/${media.publicId}.m3u8`;
  return src;
};

const getPosterSrc = (media, opts) => {
  if (!opts.cloudName) throw new Error('cloudName required');
  if (media.resourceType !== 'video') throw new Error('Not a video', media);
  const src = `${basename}/${opts.cloudName}/video/upload/so_auto/${media.publicId}.jpg`;
  return src;
};

const getUrlSrc = (url, opts) => {
  return getSrc({
    publicId: url,
    resourceType: 'url',
    width: opts.width ? opts.width * 2 : null,
    height: opts.height ? opts.height * 2 : null,
  }, opts);
};

const parse = (result) => {
  const document = {
    bytes: result.bytes,
    format: result.format,
    width: result.width,
    height: result.height,
    originalFilename: result.original_filename,
    publicId: result.public_id,
    resourceType: result.resource_type,
    duration: result.duration,
  };
  return document;
};

const cloudinary = { url, getSrc, parse, formats, getVideoSrc, getPosterSrc, getUrlSrc, resourceTypes };

export default cloudinary;
