package ru.yakovlev05.cms.catalog.service;

import org.springframework.web.multipart.MultipartFile;
import ru.yakovlev05.cms.catalog.dto.MediaDto;
import ru.yakovlev05.cms.catalog.entity.Collection;
import ru.yakovlev05.cms.catalog.entity.Media;
import ru.yakovlev05.cms.catalog.entity.Product;

import java.util.List;

public interface MediaService {
    MediaDto uploadPhoto(MultipartFile file);

    void deletePhoto(String fileName);

    List<MediaDto> getMediaPage(int page, int limit);

    void assignPhotoToProduct(String fileName, Product product);

    void assignPhotoToCollection(String fileName, Collection collection);

    Media getMediaByFileName(String fileName);
}
