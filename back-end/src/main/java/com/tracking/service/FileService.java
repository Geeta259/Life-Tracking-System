package com.tracking.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
  public String  uploadImage(String path,MultipartFile file)throws  IOException
  {
	  //file  name  get
	  String name = file.getOriginalFilename();
	  
	  //random id generate to save file 
	  String randomID = UUID.randomUUID().toString();
	  String filename = randomID.concat(name.substring(name.lastIndexOf("."))); // concate random name with file extension
	 
	  
	  //full  path
	  String filePath = path+File.separator+filename;
	  
	  //create folder  if not  created
	  File f = new File(path);
	  if(!f.exists())
	  {
		  f.mkdir();
	  }
	  //file copy
	  Files.copy(file.getInputStream(), Paths.get(filePath));
	  //System.out.println(Paths.get(filePath));
	  return filename;
  }


  public InputStream  getResource(String path,String filename) throws FileNotFoundException
  {
	  String fullpath = path+File.separator+filename;
	 InputStream  is = new FileInputStream(fullpath);
	  return is;
  }
}
