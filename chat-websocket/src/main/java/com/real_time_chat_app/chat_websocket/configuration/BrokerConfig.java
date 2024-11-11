package com.real_time_chat_app.chat_websocket.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties
public class BrokerConfig {

    private boolean useExternalBroker = true;
    private String externalBrokerHost = "localhost";
    private int externalBrokerPort = 61613;
    private String externalBrokerClientLogin = "guest";
    private String externalBrokerClientPasscode = "guest";

    public boolean isUseExternalBroker() {
        return useExternalBroker;
    }

    public void setUseExternalBroker(boolean useExternalBroker) {
        this.useExternalBroker = useExternalBroker;
    }

    public String getExternalBrokerHost() {
        return externalBrokerHost;
    }

    public void setExternalBrokerHost(String externalBrokerHost) {
        this.externalBrokerHost = externalBrokerHost;
    }

    public int getExternalBrokerPort() {
        return externalBrokerPort;
    }

    public void setExternalBrokerPort(int externalBrokerPort) {
        this.externalBrokerPort = externalBrokerPort;
    }

    public String getExternalBrokerClientLogin() {
        return externalBrokerClientLogin;
    }

    public void setExternalBrokerClientLogin(String externalBrokerClientLogin) {
        this.externalBrokerClientLogin = externalBrokerClientLogin;
    }

    public String getExternalBrokerClientPasscode() {
        return externalBrokerClientPasscode;
    }

    public void setExternalBrokerClientPasscode(String externalBrokerClientPasscode) {
        this.externalBrokerClientPasscode = externalBrokerClientPasscode;
    }
}

