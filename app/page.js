"use client";

import React, { useState } from 'react';
import yaml from 'js-yaml';
import "/styles/main.css";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [config, setConfig] = useState(null);

  const handleFriendFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setFriends(json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfigFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const yamlContent = e.target.result;
          const parsedConfig = yaml.load(yamlContent);
          setConfig(parsedConfig);
        } catch (error) {
          console.error("Error parsing YAML:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfigChange = (field, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  const addWatchedFriend = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      watched: [...prevConfig.watched, ""],
    }));
  };

  const removeWatchedFriend = (index) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      watched: prevConfig.watched.filter((_, i) => i !== index),
    }));
  };

  const addAlias = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      aliases: { ...prevConfig.aliases, "": "" },
    }));
  };

  const removeAlias = (key) => {
    const { [key]: _, ...newAliases } = config.aliases;
    setConfig((prevConfig) => ({
      ...prevConfig,
      aliases: newAliases,
    }));
  };

  const downloadConfig = () => {
    const yamlContent = yaml.dump(config);
    const element = document.createElement("a");
    const file = new Blob([yamlContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "configuration.yaml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="header-container">
        <a className="image-button" title="About this website" href="/about"><img src="https://img.icons8.com/?size=32&id=82889&format=png&color=FFFFFF" /></a>
        <h1>FriendWatch Configurator</h1>
        <a className="image-button" title="SwitchFriendWatch on GitHub" href=""><img src="https://img.icons8.com/?size=32&id=106567&format=png&color=FFFFFF" /></a>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>Friend List</h2>
          <p>Add JSON file generated by NXAPI.<br />To generate the JSON, run "nxapi nso friends --json &gt; filename".</p>
          <input type="file" accept=".json" onChange={handleFriendFileChange} />
          <ul>
            {friends.map((friend, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <img src={friend.imageUri} alt={friend.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div style={{ flex: 1 }}>
                  <div>{friend.name} (NSA ID: {friend.nsaId})</div>
                  <div style={{ paddingTop: "10px" }}>
                    {friend.presence.state === "ONLINE" ? <span style={{ color: 'green' }}>[Active]</span> : <span style={{ color: 'red' }}>[Offline]</span>}
                    {friend.presence.updatedAt === 0 ? <span style={{ color: 'gray' }}> [Invisible]</span> : null}
                    {friend.isFavoriteFriend ? <span style={{ color: 'blue' }}> [Best Friend]</span> : null}
                    {config?.watched?.includes(friend.nsaId) ? <span style={{ color: 'purple' }}> [Watched]</span> : null}
                    {config?.aliases && friend.nsaId in config.aliases ? <span style={{ color: 'orange' }}> [Has Alias]</span> : null}
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <button onClick={() => handleConfigChange('watched', [...config.watched, friend.nsaId])}>Add to Watched</button>
                    <button onClick={() => handleConfigChange('aliases', { ...config.aliases, [friend.nsaId]: [friend.name] })}>Add Alias</button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <h2>FriendWatch Settings</h2>
          <p>Add configuration.yaml file from FriendWatch.<br />This should be located in [home folder]/.littlebitstudios/switchfriendwatch.</p>
          <input type="file" accept=".yaml" onChange={handleConfigFileChange} />
          {config && (
            <div>
              <h3>Aliases</h3>
              {Object.entries(config.aliases).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={key}
                    readOnly
                    style={{ marginRight: '10px' }}
                    placeholder='NSA ID'
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleConfigChange('aliases', { ...config.aliases, [key]: e.target.value })}
                    placeholder='Alias'
                  />
                  <button onClick={() => removeAlias(key)} style={{ marginLeft: '10px' }}>Remove</button>
                </div>
              ))}
              <button onClick={addAlias}>Add Alias</button>
              <h3>Email Settings</h3>
              <label>
                Enabled:
                <input
                  type="checkbox"
                  checked={config.email.enabled}
                  onChange={(e) => handleConfigChange('email', { ...config.email, enabled: e.target.checked })}
                />
              </label><br />
              <label>
                Debug Mode:
                <input
                  type="checkbox"
                  checked={config.email.debugmode}
                  onChange={(e) => handleConfigChange('email', { ...config.email, debugmode: e.target.checked })}
                />
              </label><br />
              <label>
                Server:
                <input
                  size="30"
                  type="text"
                  value={config.email.server}
                  onChange={(e) => handleConfigChange('email', { ...config.email, server: e.target.value })}
                  placeholder="smtp.example.com"
                />
              </label><br />
              <label>
                Port:
                <input
                  type="number"
                  value={config.email.port}
                  onChange={(e) => handleConfigChange('email', { ...config.email, port: e.target.value })}
                  placeholder="485"
                  size="30"
                />
              </label><br />
              <label>
                User:
                <input
                  type="text"
                  value={config.email.user}
                  onChange={(e) => handleConfigChange('email', { ...config.email, user: e.target.value })}
                  placeholder="someone"
                  size="30"
                />
              </label><br />
              <label>
                Password:
                <input
                  type="password"
                  value={config.email.pass}
                  onChange={(e) => handleConfigChange('email', { ...config.email, pass: e.target.value })}
                  size="30"
                />
              </label><br />
              <label>
                Send From:
                <input
                  type="text"
                  value={config.email.sendfrom}
                  onChange={(e) => handleConfigChange('email', { ...config.email, sendfrom: e.target.value })}
                  placeholder="friendwatch@example.com"
                  size="30"
                />
              </label><br />
              <label>
                Send To:
                <input
                  type="text"
                  value={config.email.sendto}
                  onChange={(e) => handleConfigChange('email', { ...config.email, sendto: e.target.value })}
                  placeholder="someone@example.com"
                  size="30"
                />
              </label><br />
              <h3>Watched Friends</h3>
              {config.watched.map((watched, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={watched}
                    onChange={(e) => {
                      const newWatched = [...config.watched];
                      newWatched[index] = e.target.value;
                      handleConfigChange('watched', newWatched);
                    }}
                    placeholder="Nickname or NSA ID"
                  />
                  <button onClick={() => removeWatchedFriend(index)} style={{ marginLeft: '10px' }}>Remove</button>
                </div>
              ))}
              <button onClick={addWatchedFriend}>Add Watched Friend</button>
              <h3>Other Settings</h3>
              <label>
                Watched Only:
                <input
                  type="checkbox"
                  checked={config.watchedonly}
                  onChange={(e) => handleConfigChange('watchedonly', e.target.checked)}
                />
              </label>
              <br />
              <strong>Enable this to only receive emails for watched friends.</strong><br />
              <br />
              <label>
                Windows Mode:
                <input
                  type="checkbox"
                  checked={config.windowsmode}
                  onChange={(e) => handleConfigChange('windowsmode', e.target.checked)}
                />
              </label>
              <br />
              <strong>If you're using this configuration on a Windows machine, this must be enabled.</strong><br />
              <br />
              <button onClick={downloadConfig}>Download Configuration</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}