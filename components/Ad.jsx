export default function Ad({ placement = 'inline' }) {
  const adContainerId =
    placement === 'inline'
      ? 'container-c90e1cf06dc7451f1fd3d33c703af951'
      : `container-${placement}-c90e1cf06dc7451f1fd3d33c703af951`;

  return (
    <div className="w-full relative flex items-center justify-center min-h-[90px] md:min-h-[100px] my-6 overflow-hidden" data-ad-placement={placement}>
      <div id={adContainerId} className="w-full max-w-[300px] md:max-w-[728px] text-center" />
    </div>
  );
}
