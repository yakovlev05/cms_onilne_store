package ru.yakovlev05.cms.user.microserviceuser.props;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class KafkaConsumerProperties {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.consumer.key-deserializer}")
    private String producerKeyDeserializer;

    @Value("${spring.kafka.consumer.value-deserializer}")
    private String producerValueDeserializer;

    @Value("${spring.kafka.consumer.group-id}")
    private String consumerGroupId;
}
